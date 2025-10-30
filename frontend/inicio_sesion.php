<?php include("conexion.php"); ?>

<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Iniciar Sesión — Gramas y Suministros</title>
  <link rel="stylesheet" href="estilos/styles.css">
</head>

<body>
  <header>
    <div class="logo">
      <img src="https://via.placeholder.com/120x60?text=Logo" alt="Logo">
      <h1>Gramas <span>y</span> Suministros</h1>
    </div>
    <nav>
      <a href="index.php">Catálogo</a>
      <a href="registro.php">Registrarse</a>
    </nav>
  </header>

  <main>
    <section class="formulario">
      <h2>Iniciar Sesión</h2>

      <?php
      if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $correo = $_POST["correo"];
        $pass = $_POST["contrasena"];

        $query = "SELECT * FROM usuario WHERE correo='$correo' AND contrasena='$pass'";
        $resultado = $conexion->query($query);

        if ($resultado->num_rows > 0) {
          header("Location: index.php");
          exit();
        } else {
          echo "<p style='color:red;'>Usuario o contraseña incorrectos.</p>";
        }
      }
      ?>

      <form method="POST">
        <label for="correo">Correo electrónico</label>
        <input type="email" id="correo" name="correo" required placeholder="ejemplo@correo.com">

        <label for="contrasena">Contraseña</label>
        <input type="password" id="contrasena" name="contrasena" required placeholder="********">

        <div class="opciones">
          <a href="#">¿Olvidó su contraseña?</a>
          <p>¿No tiene cuenta? <a href="registro.php">Regístrese aquí</a></p>
        </div>

        <div class="botones">
          <a href="index.php" class="volver">Volver al catálogo</a>
          <button type="submit" class="iniciar">Iniciar sesión</button>
        </div>
      </form>
    </section>
  </main>

  <footer>
    <p>© 2025 Gramas y Suministros. Todos los derechos reservados.</p>
  </footer>
</body>

</html>
