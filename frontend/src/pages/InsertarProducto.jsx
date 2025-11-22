import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InsertarProducto.css";

const InsertarProducto = () => {
  const navigate = useNavigate();
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    altura: "",
    peso: "",
    stock: 0,
    color: "",
    aplicacion: "",
    material: "",
    marca: "",
    garantia: "",
    precio: "",
    descuento: "",
    descripcion: "",
    imagen: null, // Para manejar el archivo de imagen
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario (ej. llamada API)
    console.log("Datos a guardar:", formData);
    alert("Producto guardado (simulado)");
    // Aquí podrías navegar a la página de inventario
    // navigate('/inventario');
  };

  const handleGoBack = () => {
    // Usamos navigate para simular el enlace a "InventarioGrama.php"
    navigate("/inventario");
  };

  const handleImageUpload = () => {
    // Simula el click en el input de tipo file oculto
    document.getElementById("inputImagen").click();
  };

  return (
    // ⚠️ NOTA: Los enlaces a CSS y el favicon se gestionan en la estructura principal de la app React.
    <>
      <header>
        <div className="header-left">
          {/* Asegúrate de que esta ruta de imagen sea accesible en tu proyecto React */}
          <img src="c" alt="Logo" />
        </div>

        <div className="header-center">
          <span>Administrar Inventarios</span>
        </div>

        <div className="header-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Icono de Usuario"
            className="icono-usuario"
          />
        </div>
      </header>

      <h2>Insertar nuevo producto</h2>

      <div className="container">
        {/* Envolviendo la cuadrícula en un formulario para manejar el submit */}
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="left-column">
            <div className="image-section">
              {/* Aquí puedes mostrar la previsualización de la imagen cargada usando formData.imagen */}
              <div className="image-box" id="preview">
                {formData.imagen ? formData.imagen.name : "png/jpg/jpeg"}
              </div>

              <input
                type="file"
                id="inputImagen"
                name="imagen"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChange}
              />
              {/* Usa el onClick para activar el input de archivo */}
              <button
                type="button"
                className="btn-edit"
                onClick={handleImageUpload}
              >
                Subir imagen
              </button>
            </div>

            <div className="actions">
              {/* Usamos onClick y navigate en lugar de <a> */}
              <button className="btn" type="button" onClick={handleGoBack}>
                Regresar
              </button>
              {/* Este botón debe ser de tipo submit para activar la función handleSubmit */}
              <button className="btn" type="submit">
                Guardar
              </button>
              {/* Podrías usar el componente GlobalButton si lo necesitas: 
              <GlobalButton text="Guardar" type="submit" className="btn" /> 
              */}
            </div>
          </div>

          <div className="right-column">
            <div className="fields">
              <div className="field">
                <label htmlFor="altura">Altura</label>
                <input
                  type="text"
                  id="altura"
                  name="altura"
                  placeholder="..."
                  required
                  value={formData.altura}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="peso">Peso</label>
                <input
                  type="text"
                  id="peso"
                  name="peso"
                  placeholder="..."
                  required
                  value={formData.peso}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="color">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  placeholder="..."
                  required
                  value={formData.color}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="aplicacion">Aplicación</label>
                <input
                  type="text"
                  id="aplicacion"
                  name="aplicacion"
                  placeholder="..."
                  required
                  value={formData.aplicacion}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="material">Material</label>
                <input
                  type="text"
                  id="material"
                  name="material"
                  placeholder="..."
                  required
                  value={formData.material}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="marca">Marca</label>
                <input
                  type="text"
                  id="marca"
                  name="marca"
                  placeholder="..."
                  required
                  value={formData.marca}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="garantia">Garantía</label>
                <input
                  type="text"
                  id="garantia"
                  name="garantia"
                  placeholder="..."
                  required
                  value={formData.garantia}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="precio">Precio x m2</label>
                <input
                  type="text"
                  id="precio"
                  name="precio"
                  placeholder="..."
                  required
                  value={formData.precio}
                  onChange={handleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="descuento">Descuento</label>
                <input
                  type="text"
                  id="descuento"
                  name="descuento"
                  placeholder="..."
                  required
                  value={formData.descuento}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="description">
              <label htmlFor="descripcion">Descripción del producto</label>
              <textarea
                id="descripcion"
                name="descripcion"
                placeholder="..."
                value={formData.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InsertarProducto;
