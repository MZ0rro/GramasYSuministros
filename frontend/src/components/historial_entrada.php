<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historial de entradas</title>
  <link rel="stylesheet" href="estilos/historial.css">
</head>
<body>
  <div class="container">
    <header>
      <div class="logo">
        <!-- Aquí puedes colocar el logo -->
        <div class="logo-placeholder"></div>
        <p>Gramas y Suministros</p>
      </div>
      <h2>Administrar Inventarios</h2>
      <div class="user-icon"></div>
    </header>

    <main>
      <h1>Historial de entradas - Grama Kukuyo</h1>

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Stock</th>
              <th>Proveedor</th>
              <th>Entrada</th>
              <th>SubTotal</th>
              <th>Salida</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>19/06/2025</td>
              <td>146</td>
              <td>Janne Wu</td>
              <td>22</td>
              <td>168</td>
              <td>12</td>
              <td>156</td>
            </tr>
            <tr>
              <td>21/05/2025</td>
              <td>47</td>
              <td>Mónica Yin</td>
              <td>129</td>
              <td>176</td>
              <td>30</td>
              <td>146</td>
            </tr>
            <tr>
              <td>17/04/2025</td>
              <td>41</td>
              <td>Janne Wu</td>
              <td>23</td>
              <td>64</td>
              <td>17</td>
              <td>47</td>
            </tr>
            <tr>
              <td>20/03/2025</td>
              <td>1</td>
              <td>Janne Wu</td>
              <td>50</td>
              <td>51</td>
              <td>10</td>
              <td>41</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="button-group">
        <button class="regresar"><a href="index.html">Regresar</a></button>
        <button class="agregar" id="abrirModal">Agregar nueva entrada</button>
      </div>
    </main>
  </div>

  <!-- MODAL -->
  <div class="modal" id="modal">
    <div class="modal-content">
      <h2>Nueva entrada para “Grama Kukuyo”</h2>

      <form>
        <div class="form-group">
          <label for="fecha">Fecha de entrada</label>
          <input type="text" id="fecha" placeholder="Ingrese la fecha de entrada del producto">
        </div>

        <div class="form-group">
          <label for="cantidad">Cantidad</label>
          <input type="text" id="cantidad" placeholder="Ingrese la cantidad de entrada">
        </div>

        <div class="form-group full">
          <label for="proveedor">Proveedor</label>
          <input type="text" id="proveedor" placeholder="Ingrese la fecha de entrada del producto">
        </div>

        <div class="modal-buttons">
          <button type="button" class="descartar" id="cerrarModal">Descartar</button>
          <button type="submit" class="guardar">Guardar cambios</button>
        </div>
      </form>
    </div>
  </div>

  <script>
    const modal = document.getElementById("modal");
    const abrirModal = document.getElementById("abrirModal");
    const cerrarModal = document.getElementById("cerrarModal");

    abrirModal.addEventListener("click", () => modal.classList.add("show"));
    cerrarModal.addEventListener("click", () => modal.classList.remove("show"));
  </script>
</body>
</html>
