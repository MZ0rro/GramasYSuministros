<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inventario de Grama Sintética</title>
  <link rel="stylesheet" href="estilos/inventario.css">
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
      <h1>Inventario de Grama Sintética</h1>

      <div class="table-wrapper">
        <table id="tablaInventario">
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Altura</th>
              <th>Peso</th>
              <th>Stock</th>
              <th>Precio x m²</th>
              <th>Eliminar</th>
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
              <td><button class="eliminar"><span>🗑️</span></button></td>
            </tr>
            <tr>
              <td>02</td>
              <td>Grama deportiva</td>
              <td>16mm</td>
              <td>25kg</td>
              <td>14</td>
              <td>43.900</td>
              <td><button class="eliminar"><span>🗑️</span></button></td>
            </tr>
            <tr>
              <td>03</td>
              <td>Grama para terraza</td>
              <td>32mm</td>
              <td>41kg</td>
              <td>133</td>
              <td>59.900</td>
              <td><button class="eliminar"><span>🗑️</span></button></td>
            </tr>
            <tr>
              <td>04</td>
              <td>Grama de parque</td>
              <td>20mm</td>
              <td>29kg</td>
              <td>0</td>
              <td>35.900</td>
              <td><button class="eliminar"><span>🗑️</span></button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <button class="regresar"><a href="admin_inventario.php">Regresar</a></button>
    </main>
  </div>

  <script>
    // Al hacer clic en el botón rojo, desaparece visualmente la fila
    document.querySelectorAll('.eliminar').forEach(boton => {
      boton.addEventListener('click', e => {
        const fila = e.target.closest('tr');
        fila.classList.add('ocultar');
        setTimeout(() => fila.style.display = 'none', 400);
      });
    });
  </script>
</body>
</html>
