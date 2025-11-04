<?php
include("conexion.php");
$mensaje = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $nombre = trim($_POST["nombre"]);
  $apellido = trim($_POST["apellido"]);
  $email = trim($_POST["email"]);
  $password = trim($_POST["password"]);
  $rol = 2; // cliente

  $sql = "INSERT INTO usuario (nombre, apellido, email, password_hash, estado, id_rol, created_at, updated_at)
          VALUES ('$nombre', '$apellido', '$email', '$password', 'activo', '$rol', NOW(), NOW())";

  if ($conexion->query($sql) === TRUE) {
    $mensaje = "✅ Registro exitoso. Ahora puede iniciar sesión.";
  } else {
    $mensaje = "❌ Error al registrar: " . $conexion->error;
  }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro — Gramas y Suministros</title>
  <link rel="stylesheet" href="estilos/global.css">
</head>
<body>
  <header>
    <div class="logo">
      <img src="estilos/logo.png" alt="Logo de Gramas y Suministros">
      <h1>Gramas y Suministros</h1>
    </div>
    <nav>
      <a href="index.php">Inicio</a>
      <a href="inicio_sesion.php">Iniciar sesión</a>
    </nav>
  </header>

  <main>
    <h2 style="text-align:center; color:var(--verde); margin-bottom:20px;">Crear cuenta</h2>
    <?php if ($mensaje) echo "<p style='text-align:center; color:green;'>$mensaje</p>"; ?>

    <form method="POST">
      <label>Nombre</label>
      <input type="text" name="nombre" required>

      <label>Apellido</label>
      <input type="text" name="apellido" required>

      <label>Correo electrónico</label>
      <input type="email" name="email" required>

      <label>Contraseña</label>
      <input type="password" name="password" required>

      <button type="submit" class="boton">Registrarse</button>
    </form>
  </main>

  <footer>
    © 2025 Gramas y Suministros — Todos los derechos reservados.
  </footer>
</body>
</html>
