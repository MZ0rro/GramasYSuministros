<?php
session_start();
include("conexion.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $email = trim($_POST["email"]);
  $_SESSION['reset_email'] = $email;
  // generamos código de 6 dígitos y guardamos en sesión (simulación de envío)
  $_SESSION['reset_code'] = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
  // redirigimos al paso de verificación
  header("Location: verificar_codigo.php");
  exit();
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>¿Olvidó su contraseña?</title>
  <link rel="stylesheet" href="estilos/olvido_contrasena.css">
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
      <h1>¿Olvidó su contraseña? 😊</h1>
      <p>Se te enviará un código al siguiente correo</p>
      <form action="verificar_codigo.php" method="POST">
        <input type="email" name="correo" placeholder="ejemplo@correo.com" required>
        <button type="submit">Enviar</button>
      </form>
      <a href="login.php" class="volver">Volver</a>
    </div>
  </main>

  <footer class="bottombar">
    <p>© 2025 Gramas y Suministros — Todos los derechos reservados.</p>
  </footer>
</body>
</html>
