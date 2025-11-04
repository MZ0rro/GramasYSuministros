<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="InsertarProducto.css" />
    <link
      rel="icon"
      type="image/png"
      href="Img/Captura-de-pantalla-2025-11-01-191320.ico"
    />

    <title>Insertar nuevo producto</title>
  </head>
  <body>
    <header>
      <div class="header-left">
        <img src="Img/Captura de pantalla 2025-11-01 190719.png" />
      </div>

      <div class="header-center">
        <span>Administrar Inventarios</span>
      </div>

      <div class="header-right">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="Usuario"
          class="icono-usuario"
        />
      </div>
    </header>

    <h2>Insertar nuevo producto</h2>

    <div class="container">
      <div class="form-grid">
        <!-- Columna izquierda (imagen + botones) -->
        <div class="left-column">
          <div class="image-section">
            <div class="image-box" id="preview">png/jpg/jpeg</div>
            <input
              type="file"
              id="inputImagen"
              accept="image/*"
              style="display: none"
            />
            <button class="btn-edit" id="btnImagen">Subir imagen</button>
          </div>

          <div class="actions">
            <button class="btn">Regresar</button>
            <button class="btn">Guardar</button>
          </div>
        </div>

        <!-- Columna derecha (campos + descripción) -->
        <div class="right-column">
          <div class="fields">
            <div class="field">
              <label>Altura</label>
              <input type="text" placeholder="..." required/>
            </div>
            <div class="field">
              <label>Peso</label>
              <input type="text" placeholder="..." required />
            </div>
            <div class="field">
              <label>Stock</label>
              <input type="number" value="0"  required/>
            </div>
            <div class="field">
              <label>Color</label>
              <input type="text" placeholder="..." required/>
            </div>
            <div class="field">
              <label>Aplicación</label>
              <input type="text" placeholder="..." required />
            </div>
            <div class="field"> 
              <label>Material</label>
              <input type="text" placeholder="..."required/>
            </div>
            <div class="field">
              <label>Marca</label>
              <input type="text" placeholder="..." required/>
            </div>
            <div class="field">
              <label>Garantía</label>
              <input type="text" placeholder="..."required />
            </div>
            <div class="field">
              <label>Precio x m2</label>
              <input type="text" placeholder="..." required/>
            </div>
            <div class="field">
              <label>Descuento</label>
              <input type="text" placeholder="..." required/>
            </div>
          </div>

          <div class="description">
            <label>Descripción del producto</label>
            <textarea placeholder="..."></textarea>
          </div>
        </div>
      </div>
      <script src="InsertarProducto.js"></script>
    </div>
  </body>
</html>
