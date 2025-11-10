<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Administrar Inventarios</title>
  <link rel="stylesheet" href="styles.css">
</head>

<body>
  <div class="container">
    <header>
      <div class="logo">
        <!-- Aquí va el logo -->
        <div class="logo-placeholder"></div>
        <p>Gramas y Suministros</p>
      </div>
      <h2>Administrar Inventarios</h2>
      <div class="user-icon"></div>
    </header>

    <main>
      <h1>Stock de Grama Sintética</h1>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Stock</th>
              <th>Estado</th>
              <th>Historial de entradas y salidas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Grama Kikuyo</td>
              <td>156</td>
              <td><span class="estado activo">Activo</span></td>
              <td><button><a href="historial_entrada.php">Ver y agregar nueva entrada</a></button></td>
            </tr>
            <tr>
              <td>02</td>
              <td>Grama Bermuda</td>
              <td>14</td>
              <td><span class="estado alerta">Alerta</span></td>
              <td><button>Ver y agregar nueva entrada</button></td>
            </tr>
            <tr>
              <td>03</td>
              <td>Grama sintética premium</td>
              <td>133</td>
              <td><span class="estado activo">Activo</span></td>
              <td><button>Ver y agregar nueva entrada</button></td>
            </tr>
            <td>04</td>
            <td>Abono orgánico compostado</td>
            <td>46</td>
            <td><span class="estado activo">Activo</span></td>
            <td><button>Ver y agregar nueva entrada</button></td>
            </tr>
            <tr>
              <td>05</td>
              <td>Tijeras de podar</td>
              <td>0</td>
              <td><span class="estado inactivo">Inactivo</span></td>
              <td><button>Ver y agregar nueva entrada</button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="btnn">
        <a class="regresar" href="dashboard.php">Regresar</a>
        <a class="regresar" href="eliminar_producto.php">Eliminar un producto</a>
      </div>

    </main>
  </div>
</body>

</html>