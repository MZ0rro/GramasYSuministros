<?php
// login.php
session_start();
include("conexion.php"); // Debe definir $conexion (mysqli)

// --- CONFIG ---
define('CSRF_TTL', 60 * 15); // Token válido 15 minutos

// Genera o devuelve token CSRF
function get_csrf_token() {
    if (empty($_SESSION['csrf_token']) || empty($_SESSION['csrf_token_time']) || (time() - $_SESSION['csrf_token_time']) > CSRF_TTL) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        $_SESSION['csrf_token_time'] = time();
    }
    return $_SESSION['csrf_token'];
}

// Valida token CSRF y lo elimina para evitar reuso
function validate_csrf_token($token) {
    if (empty($token) || empty($_SESSION['csrf_token'])) {
        return false;
    }
    $valid = hash_equals($_SESSION['csrf_token'], $token);
    $not_expired = (time() - ($_SESSION['csrf_token_time'] ?? 0)) <= CSRF_TTL;
    // Eliminar siempre (previene reuso)
    unset($_SESSION['csrf_token'], $_SESSION['csrf_token_time']);
    return $valid && $not_expired;
}

$mensaje = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Validar token CSRF primero
    $csrf = $_POST['csrf_token'] ?? '';
    if (!validate_csrf_token($csrf)) {
        $mensaje = "⚠️ Solicitud inválida (CSRF). Recarga la página e intenta de nuevo.";
    } else {
        // Obtener y sanitizar entrada
        $email = trim($_POST["email"] ?? '');
        $password = trim($_POST["password"] ?? '');

        if ($email === '' || $password === '') {
            $mensaje = "⚠️ Completa los campos requeridos.";
        } else {
            // Consulta preparada para traer columnas de contraseña posibles
            $stmt = $conexion->prepare("SELECT id_usuario, nombre, id_rol, password_hash, `password` FROM usuario WHERE email = ? AND estado = 'activo' LIMIT 1");
            if ($stmt) {
                $stmt->bind_param("s", $email);
                $stmt->execute();
                $resultado = $stmt->get_result();

                if ($resultado && $resultado->num_rows > 0) {
                    $usuario = $resultado->fetch_assoc();

                    // Determinar de qué columna venía la contraseña (soporta 'password_hash' o 'password')
                    $stored = '';
                    $pw_col = null;
                    if (array_key_exists('password_hash', $usuario) && $usuario['password_hash'] !== null) {
                        $stored = $usuario['password_hash'];
                        $pw_col = 'password_hash';
                    } elseif (array_key_exists('password', $usuario) && $usuario['password'] !== null) {
                        $stored = $usuario['password'];
                        $pw_col = 'password';
                    }

                    $logged_in = false;

                    if ($stored !== '') {
                        // Si la contraseña almacenada parece un hash compatible con password_verify (bcrypt/argon2)
                        $looks_like_hash = (strpos($stored, '$2y$') === 0) || (strpos($stored, '$2a$') === 0) || (strpos($stored, '$argon2') === 0) || (strpos($stored, '$argon2i') === 0) || (strpos($stored, '$argon2id') === 0);

                        if ($looks_like_hash) {
                            // Verificamos con password_verify
                            if (password_verify($password, $stored)) {
                                $logged_in = true;
                            } else {
                                $logged_in = false;
                            }
                        } else {
                            // Caso legacy: la BD tiene la contraseña en texto plano (o en formato no hashed)
                            if (hash_equals((string)$stored, (string)$password)) {
                                // Coincide: re-hashemos y actualizamos la misma columna para migrar
                                $newHash = password_hash($password, PASSWORD_DEFAULT);
                                // Actualizamos la columna desde la cual venía la contraseña
                                if ($pw_col !== null) {
                                    $upd = $conexion->prepare("UPDATE usuario SET {$pw_col} = ? WHERE id_usuario = ?");
                                    if ($upd) {
                                        $upd->bind_param("si", $newHash, $usuario['id_usuario']);
                                        $upd->execute();
                                        $upd->close();
                                        $logged_in = true;
                                        // Opcional: si quieres mantener nombre de columna 'password_hash' en vez de 'password',
                                        // podrías agregar lógica extra para crear/llenar password_hash, pero esto es mínimo seguro.
                                    } else {
                                        $mensaje = "⚠️ Error interno al actualizar la contraseña.";
                                        $logged_in = false;
                                    }
                                } else {
                                    $mensaje = "⚠️ Error interno: columna de contraseña no encontrada.";
                                    $logged_in = false;
                                }
                            } else {
                                $logged_in = false;
                            }
                        }
                    } else {
                        $mensaje = "⚠️ No hay una contraseña almacenada para este usuario.";
                        $logged_in = false;
                    }

                    if ($logged_in) {
                        // Autenticación correcta
                        session_regenerate_id(true); // evita fijación de sesión
                        $_SESSION["usuario_id"] = $usuario["id_usuario"];
                        $_SESSION["usuario_nombre"] = $usuario["nombre"];
                        $_SESSION["usuario_rol"] = $usuario["id_rol"];

                        header("Location: dashboard.php");
                        exit();
                    } else {
                        if ($mensaje === "") {
                            $mensaje = "⚠️ Contraseña incorrecta.";
                        }
                    }
                } else {
                    $mensaje = "⚠️ Usuario no encontrado o inactivo.";
                }

                $stmt->close();
            } else {
                $mensaje = "⚠️ Error interno (consulta). Intenta más tarde.";
            }
        }
    }
}

// Generar token para el formulario (GET o POST con error)
$csrf_token = get_csrf_token();
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Iniciar Sesión — Gramas y Suministros</title>
  <link rel="stylesheet" href="estilos/global.css" />
  <link rel="icon" type="image/png" href="img/icono.ico" />
</head>
<body>
  <header>
    <div class="logo">
      <img src="estilos/logo.png" alt="Logo de Gramas y Suministros" />
      <h1>Gramas y Suministros</h1>
    </div>
    <nav>
      <a href="index.php">Inicio</a>
      <a href="registro.php">Registrarse</a>
    </nav>
  </header>

  <main>
    <h2 style="text-align:center; color:var(--verde); margin-bottom:20px;">Iniciar Sesión</h2>

    <?php if ($mensaje): ?>
      <p style="color:red; text-align:center;"><?php echo htmlspecialchars($mensaje); ?></p>
    <?php endif; ?>

    <form method="POST" novalidate>
      <label>Correo electrónico</label>
      <input type="email" name="email" required placeholder="ejemplo@correo.com" />

      <label>Contraseña</label>
      <input type="password" name="password" required placeholder="********" />

      <!-- Token CSRF -->
      <input type="hidden" name="csrf_token" value="<?php echo htmlspecialchars($csrf_token); ?>">

      <button type="submit" class="boton">Entrar</button>
    </form>
  </main>

  <footer>
    © 2025 Gramas y Suministros — Todos los derechos reservados.
  </footer>
</body>
</html>

