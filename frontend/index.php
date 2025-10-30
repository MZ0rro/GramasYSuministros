<?php include("conexion.php"); ?>
<!doctype html>
<html lang="es">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Catálogo de productos — Gramas y Suministros</title>
  <link rel="stylesheet" href="estilos/index.css" />
</head>

<body>
  <div class="container">
    <header>
      <div>
        <h1>Catálogo de productos</h1>
        <p class="lead">Explora los productos disponibles en nuestra tienda.</p>
      </div>
      <div>
        <a href="index.php"><button>Inicio</button></a>
        <a href="inicio_sesion.php"><button>Iniciar Sesión</button></a>
        <a href="registro.php"><button>Registrarse</button></a>
      </div>
    </header>

    <main>
      <section class="grid">
        <?php
        $sql = "SELECT * FROM producto";
        $resultado = $conexion->query($sql);
        if ($resultado->num_rows > 0) {
          while ($row = $resultado->fetch_assoc()) {
            echo '<article class="card">';
            echo '<img src="https://via.placeholder.com/600x400?text=' . urlencode($row["nombre"]) . '" alt="' . htmlspecialchars($row["nombre"]) . '">';
            echo '<div class="meta">';
            echo '<h2 class="title">' . htmlspecialchars($row["nombre"]) . '</h2>';
            echo '<div class="price">$' . number_format($row["precio"], 0, ',', '.') . '</div>';
            echo '</div>';
            echo '<p class="desc">';
            echo 'Marca: ' . htmlspecialchars($row["marca"]) . '<br>';
            echo 'Material: ' . htmlspecialchars($row["material"]) . '<br>';
            echo 'Peso: ' . htmlspecialchars($row["peso"]) . ' kg<br>';
            echo 'Altura: ' . htmlspecialchars($row["altura"]) . ' cm<br>';
            echo htmlspecialchars($row["descripcion"]);
            echo '</p>';
            echo '</article>';
          }
        } else {
          echo "<p>No hay productos registrados en la base de datos.</p>";
        }
        ?>
      </section>
    </main>

    <footer>
      <div>© <span id="year"></span> Gramas y Suministros — Todos los derechos reservados</div>
    </footer>
  </div>

  <script>
    document.getElementById('year').textContent = new Date().getFullYear();
  </script>
</body>

</html>
