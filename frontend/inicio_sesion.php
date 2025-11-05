<?php
session_start();
include("conexion.php");

$mensaje = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $email = trim($_POST["email"]);
  $password = trim($_POST["password"]);

  $query = "SELECT * FROM usuario WHERE email = '$email' AND estado = 'activo'";
  $resultado = $conexion->query($query);

  if ($resultado && $resultado->num_rows > 0) {
    $usuario = $resultado->fetch_assoc();

    if ($usuario["password_hash"] === $password) { // aquí podrías usar password_verify
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
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iniciar Sesión — Gramas y Suministros</title>
  <link rel="stylesheet" href="estilos/global.css">
  <link
      rel="icon"
      type="image/png"
      href="img/icono.ico"
    />
</head>
<body>
  <header>
    <div class="logo">
      <img src="estilos/logo.png" alt="Logo de Gramas y Suministros">
      <h1>Gramas y Suministros</h1>
    </div>
    <nav>
      <a href="index.php">Inicio</a>
      <a href="registro.php">Registrarse</a>
    </nav>
  </header>

  <main>
    <h2 style="text-align:center; color:var(--verde); margin-bottom:20px;">Iniciar Sesión</h2>
    <?php if ($mensaje) echo "<p style='color:red; text-align:center;'>$mensaje</p>"; ?>

    <form method="POST">
      <label>Correo electrónico</label>
      <input type="email" name="email" required placeholder="ejemplo@correo.com">

      <label>Contraseña</label>
      <input type="password" name="password" required placeholder="********">

      <button type="submit" class="boton">Entrar</button>
    </form>
  </main>

  <footer>
    © 2025 Gramas y Suministros — Todos los derechos reservados.
  </footer>
</body>
</html>
