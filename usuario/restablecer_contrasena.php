<?php
session_start();
include("conexion.php");

if (empty($_SESSION['reset_email'])) {
  header("Location: olvido_contrasena.php");
  exit();
}

$mensaje = "";
$showModal = false;
$email = $_SESSION['reset_email'];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $p1 = $_POST['password'] ?? '';
  $p2 = $_POST['password2'] ?? '';

  // validación server-side
  if (strlen($p1) < 8 || !preg_match('/[A-Za-z]/', $p1) || !preg_match('/\d/', $p1)) {
    $mensaje = "La contraseña debe tener al menos 8 caracteres y contener letras y números.";
  } elseif ($p1 !== $p2) {
    $mensaje = "Las contraseñas no coinciden.";
  } else {
    $hash = password_hash($p1, PASSWORD_DEFAULT);
    if (!empty($conexion)) {
      $sql = "UPDATE usuario SET password_hash = ? WHERE email = ? LIMIT 1";
      $stmt = $conexion->prepare($sql);
      if ($stmt) {
        $stmt->bind_param("ss", $hash, $email);
        if ($stmt->execute()) {
          $showModal = true;
          unset($_SESSION['reset_code'], $_SESSION['reset_email']);
        } else {
          $mensaje = "Error al actualizar la contraseña.";
        }
        $stmt->close();
      } else {
        $mensaje = "Error en la operación de base de datos.";
      }
    } else {
      // modo simulación si no hay conexión
      $showModal = true;
      unset($_SESSION['reset_code'], $_SESSION['reset_email']);
    }
  }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Restablecer contraseña</title>
  <link rel="stylesheet" href="estilos/restablecer_contrasena.css">
</head>
<body>
  <header class="topbar">
    <div class="inner">
      <img src="https://github.com/MZ0rro/GramasYSuministros/blob/master/frontend/estilos/logo.png?raw=true" class="logo" alt="Logo">
      <h2>Gramas y Suministros</h2>
    </div>
  </header>

  <main class="container">
    <div class="card">
      <h1>Restablecer contraseña 🔒</h1>
      <p>Digita y confirma tu nueva contraseña</p>
      <form action="login.php" method="POST">
        <input type="password" name="nueva" placeholder="Nueva contraseña" required>
        <input type="password" name="confirmar" placeholder="Confirmar contraseña" required>
        <button type="submit">Guardar</button>
      </form>
      <a href="login.php" class="volver">Volver</a>
    </div>
  </main>

  <footer class="bottombar">
    <p>© 2025 Gramas y Suministros — Todos los derechos reservados.</p>
  </footer>
</body>
</html>
