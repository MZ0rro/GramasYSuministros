<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Stock de Grama Sintética</title>
    <link rel="stylesheet" href="estilos/Stock.css" />
  </head>
  <body>
    <header>
      <div class="logo">
        <img src="Img/Captura de pantalla 2025-11-01 190719.png" alt="Logo" />
      </div>
      <h1>Administrar Inventarios</h1>
      <div class="header-right">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="Usuario"
          class="icono-usuario"
        />
      </div>
    </header>
    <main>
      <h2>Stock de Grama Sintética</h2>
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
            <td>Grama para jardín</td>
            <td>156</td>
            <td class="estado-activo">Activo</td>
            <td><button class="btn">Ver y agregar nueva entrada</button></td>
          </tr>
          <tr>
            <td>02</td>
            <td>Grama deportiva</td>
            <td>14</td>
            <td class="estado-alerta">Alerta</td>
            <td><button class="btn">Ver y agregar nueva entrada</button></td>
          </tr>
          <tr>
            <td>03</td>
            <td>Grama para terraza</td>
            <td>133</td>
            <td class="estado-activo">Activo</td>
            <td><button class="btn">Ver y agregar nueva entrada</button></td>
          </tr>
          <tr>
            <td>04</td>
            <td>Grama de parque</td>
            <td>0</td>
            <td class="estado-inactivo">Inactivo</td>
            <td><button class="btn">Ver y agregar nueva entrada</button></td>
          </tr>
        </tbody>
      </table>

      <div class="bottom-button">
        <a href="InventarioGrama.php"><button class="btn1">Regresar</button></a>
      </div>
    </main>
  </body>
</html>
