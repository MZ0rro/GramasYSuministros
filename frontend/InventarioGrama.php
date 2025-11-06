<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="estilos/InventarioGrama.css" />
    <link
      rel="icon"
      type="image/png"
      href="img/icono.ico"
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
      <a href="#"> <button class="btn">Regresar</button></a> 
        <h2>Inventario de Grama Sintética</h2>
        <a href="InsertarProducto.php"><button  class="btn">+</button></a>
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
                <a href="#"><button>Más info.</button></a>
                <a href="#"><button>Editar</button></a>
                <a href="#"><button>Eliminar</button></a>
                <a href="Stock.php"><button>Stock</button></a>
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
            <a href="#"><button>Más info.</button></a>
                <a href="#"><button>Editar</button></a>
                <a href="#"><button>Eliminar</button></a>
                <a href="Stock.php"><button>Stock</button></a>
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
              <a href="#"><button>Más info.</button></a>
                <a href="#"><button>Editar</button></a>
                <a href="#"><button>Eliminar</button></a>
                <a href="Stock.php"><button>Stock</button></a>
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
                <a href="#"><button>Más info.</button></a>
                <a href="#"><button>Editar</button></a>
                <a href="#"><button>Eliminar</button></a>
                <a href="Stock.php"><button>Stock</button></a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="bottom-button">
        <button class="btn">Regresar</button>
      </div>
    </main>
    <script >
      // Mostrar / ocultar menú desplegable al hacer clic en "..."
const botonesMas = document.querySelectorAll(".btn-more");

botonesMas.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // evita que se cierre inmediatamente
    const menu = btn.nextElementSibling;

    // Cierra todos los demás menús antes de abrir este
    document.querySelectorAll(".menu").forEach((m) => {
      if (m !== menu) m.style.display = "none";
    });

    // Alternar el menú actual
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
  });
});

// Cierra el menú al hacer clic fuera
document.addEventListener("click", () => {
  document.querySelectorAll(".menu").forEach((m) => (m.style.display = "none"));
});

    </script>
  </body>
</html>
