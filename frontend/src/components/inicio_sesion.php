<?php
session_start();
include("conexion.php"); // asegúrate que $conexion sea mysqli

$mensaje = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"] ?? '');
    $password = trim($_POST["password"] ?? '');

    if ($email === '' || $password === '') {
        $mensaje = "⚠️ Completa todos los campos.";
    } else {
        // Prepared statement seguro
        $stmt = $conexion->prepare("SELECT id_usuario, nombre, id_rol, password_hash FROM usuario WHERE email = ? AND estado = 'activo' LIMIT 1");
        if ($stmt === false) {
            $mensaje = "⚠️ Error interno (preparando consulta).";
        } else {
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $resultado = $stmt->get_result();

            if ($resultado && $resultado->num_rows > 0) {
                $usuario = $resultado->fetch_assoc();
                $stored = isset($usuario['password_hash']) ? trim((string)$usuario['password_hash']) : '';

                $logged_in = false;

                if ($stored !== '') {
                    // Si parece un hash, usar password_verify, si no comparar en texto plano
                    $looks_like_hash = (
                        strpos($stored, '$2y$') === 0 ||
                        strpos($stored, '$2a$') === 0 ||
                        strpos($stored, '$argon2') === 0 ||
                        strpos($stored, '$argon2i') === 0 ||
                        strpos($stored, '$argon2id') === 0
                    );

                    if ($looks_like_hash) {
                        if (password_verify($password, $stored)) {
                            $logged_in = true;
                        }
                    } else {
                        // comparación en texto plano (asegúrate que en la BD esté exactamente igual)
                        if ($stored === $password) {
                            $logged_in = true;
                        }
                    }
                }

                if ($logged_in) {
                    $_SESSION["usuario_id"] = $usuario["id_usuario"];
                    $_SESSION["usuario_nombre"] = $usuario["nombre"];
                    $_SESSION["usuario_rol"] = $usuario["id_rol"];
                    header("Location: dashboard.php");
                    exit();
                } else {
                    $mensaje = "⚠️ Contraseña incorrecta.";
                }
            } else {
                $mensaje = "⚠️ Usuario no encontrado o inactivo.";
            }

            $stmt->close();
        }
    }
}
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
      <img src="img/logo.png" alt="Logo de Gramas y Suministros" />
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

    <form method="POST" class="formulario-login">
      <label>Correo electrónico</label>
      <input type="email" name="email" required placeholder="ejemplo@correo.com" />

      <label>Contraseña</label>
      <input type="password" name="password" required placeholder="********" />

      <button type="submit" class="boton">Entrar</button>
    </form>
  </main>

  <footer>
    © 2025 Gramas y Suministros — Todos los derechos reservados.
  </footer>
</body>
</html>
