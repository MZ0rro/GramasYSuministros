<?php include("conexion.php"); ?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gramas y Suministros — Catálogo</title>
  <link rel="stylesheet" href="estilos/global.css">
</head>
<body>
  <header>
    <div class="logo">
      <img src="estilos/logo.png" alt="Logo de Gramas y Suministros">
    </div>
    <nav>
      <a href="index.php">Inicio</a>
      <a href="productos.php">Productos</a>
      <a href="registro.php">Registrarse</a>
      <a href="inicio_sesion.php">Iniciar sesión</a>
    </nav>
  </header>

  <main>
    <h2 style="color:var(--verde);">Catálogo de productos</h2>
    <p>Explora nuestra selección de productos para tu jardín y espacios verdes.</p>

    <div class="productos">
      <?php
      $sql = "SELECT * FROM producto";
      $resultado = $conexion->query($sql);

      if ($resultado && $resultado->num_rows > 0) {
        while ($row = $resultado->fetch_assoc()) {
          echo "<div class='card'>
                  <img src='https://via.placeholder.com/400x250?text=" . urlencode($row['nombre']) . "' alt='" . htmlspecialchars($row['nombre']) . "'>
                  <div class='card-content'>
                    <h3>" . htmlspecialchars($row['nombre']) . "</h3>
                    <p>" . htmlspecialchars($row['descripcion']) . "</p>
                    <p class='precio'>$" . number_format($row['precio'], 0, ',', '.') . "</p>
                  </div>
                </div>";
        }
      } else {
        echo "<p>No hay productos registrados en la base de datos.</p>";
      }
      ?>
    </div>
  </main>

  <footer>
    © 2025 Gramas y Suministros — Todos los derechos reservados.
  </footer>
</body>
</html>
