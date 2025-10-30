<?php include("conexion.php"); ?>

<!doctype html>
<html lang="es">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Registrarse — Gramas y Suministros</title>
  <link rel="stylesheet" href="estilos/styles.css" />
</head>

<body>
  <header class="topbar">
    <div class="logo">
      <div class="logo-mark">🌿</div>
      <div class="logo-text">Gramas <span>y</span> Suministros</div>
    </div>
    <a class="pill pill-back" href="inicio_sesion.php">Volver</a>
  </header>

  <main class="center">
    <div class="form-card">
      <div class="card-header">Registrarse</div>

      <?php
      if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $nombre = $_POST["nombre"];
        $correo = $_POST["correo"];
        $usuario = $_POST["usuario"];
        $contrasena = $_POST["contrasena"];

        $sql = "INSERT INTO usuario (nombre, correo, usuario, contrasena) 
                VALUES ('$nombre', '$correo', '$usuario', '$contrasena')";

        if ($conexion->query($sql) === TRUE) {
          echo "<p style='color:green;'>Registro exitoso. <a href='inicio_sesion.php'>Inicie sesión aquí</a>.</p>";
        } else {
          echo "<p style='color:red;'>Error al registrar: " . $conexion->error . "</p>";
        }
      }
      ?>

      <form method="POST">
        <label>Nombre Completo</label>
        <input type="text" name="nombre" placeholder="Ingrese su nombre completo" required>

        <label>Correo electrónico</label>
        <input type="email" name="correo" placeholder="ejemplo@correo.com" required>

        <label>Nombre de usuario</label>
        <input type="text" name="usuario" placeholder="usuario123" required>

        <label>Contraseña</label>
        <input type="password" name="contrasena" placeholder="********" required>

        <div class="btn-row">
          <button type="submit" class="btn-register">Registrarse</button>
        </div>

        <div class="footer-note">
          ¿Ya tiene una cuenta? <a href="inicio_sesion.php">Inicie sesión</a>
        </div>
      </form>
    </div>
  </main>

  <footer>
    <p>© 2025 Gramas y Suministros. Todos los derechos reservados.</p>
  </footer>
</body>

</html>
