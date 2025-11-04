<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="estilos/InventarioGrama.css" />
    <link
      rel="icon"
      type="image/png"
      href="Img/Captura-de-pantalla-2025-11-01-191320.ico"
    />
    <title>Inventario de Grama Sintética</title>
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
      <div class="top-buttons">
        <button class="btn">Regresar</button>
        <h2>Inventario de Grama Sintética</h2>
        <button class="btn"><a href="InsertarProducto.php">+</a></button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Stock</th>
            <th>Precio x m2</th>
            <th>Más</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Grama para jardín</td>
            <td>40mm</td>
            <td>49kg</td>
            <td>156</td>
            <td>67.900</td>
            <td>
              <button class="btn-more">...</button>
              <div class="menu">
                <button>Más info.</button>
                <button>Editar</button>
                <button>Eliminar</button>
                <button><a href="">Stock</a></button>
              </div>
            </td>
          </tr>
          <tr>
            <td>02</td>
            <td>Grama deportiva</td>
            <td>10mm</td>
            <td>25kg</td>
            <td>14</td>
            <td>43.900</td>
            <td>
              <button class="btn-more">...</button>
              <div class="menu">
                <button>Más info.</button>
                <button>Editar</button>
                <button>Eliminar</button>
                <button><a href="#">Stock</a></button>
              </div>
            </td>
          </tr>
          <tr>
            <td>03</td>
            <td>Grama para terraza</td>
            <td>35mm</td>
            <td>41kg</td>
            <td>133</td>
            <td>59.900</td>
            <td>
              <button class="btn-more">...</button>
              <div class="menu">
                <button>Más info.</button>
                <button>Editar</button>
                <button>Eliminar</button>
                <button><a href="#">Stock</a></button>
              </div>
            </td>
          </tr>
          <tr>
            <td>04</td>
            <td>Grama de parque</td>
            <td>20mm</td>
            <td>29kg</td>
            <td>0</td>
            <td>35.900</td>
            <td>
              <button class="btn-more">...</button>
              <div class="menu">
                <button>Más info.</button>
                <button>Editar</button>
                <button>Eliminar</button>
                <button><a href="#">Stock</a></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="bottom-button">
        <button class="btn">Regresar</button>
      </div>
    </main>
    <script src="InventarioGrama.js"></script>
  </body>
</html>
