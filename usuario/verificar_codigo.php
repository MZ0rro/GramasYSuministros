<?php
session_start();
include("conexion.php");

if (empty($_SESSION['reset_email'])) {
  header("Location: olvido_contrasena.php");
  exit();
}

$mensaje = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  if (isset($_POST['resend'])) {
    // reenviar (simulación)
    $_SESSION['reset_code'] = str_pad(random_int(0,999999),6,'0',STR_PAD_LEFT);
    $mensaje = "Se reenvió el código (simulación).";
  } else {
    $codigo = trim($_POST['codigo'] ?? '');
    if (!empty($_SESSION['reset_code']) && $codigo === $_SESSION['reset_code']) {
      header("Location: restablecer_contrasena.php");
      exit();
    } else {
      $mensaje = "⚠️ Código incorrecto. Intenta nuevamente.";
    }
  }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Verificar código</title>
  <link rel="stylesheet" href="estilos/verificar_codigo.css">
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
      <h1>Verificación 🔑</h1>
      <p>Digita el código que fue enviado a tu correo</p>
      <form action="restablecer_contrasena.php" method="POST">
        <input type="text" name="codigo" maxlength="6" placeholder="Código recibido" required>
        <button type="submit">Enviar</button>
      </form>
      <a href="olvido_contrasena.php" class="volver">Volver</a>
    </div>
  </main>

  <footer class="bottombar">
    <p>© 2025 Gramas y Suministros — Todos los derechos reservados.</p>
  </footer>
</body>
</html>