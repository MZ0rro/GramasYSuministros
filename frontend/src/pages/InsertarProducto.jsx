import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Insertar.css";

const InsertarProducto = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
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
    campoAdicional: "",
    imagen: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));

      // Crear preview de la imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos a guardar:", formData);
    alert("Producto guardado (simulado)");
  };

  const handleGoBack = () => {
    navigate("/inventario");
  };

  const handleImageClick = () => {
    document.getElementById("inputImagen").click();
  };

  return (
    <>
      <header>
        <div className="header-left">
          <img
            src="/Img/Captura de pantalla 2025-11-01 190719.png"
            alt="Logo"
          />
        </div>

        <div className="header-center">
          <span>Administrar Inventarios</span>
        </div>

        <div className="header-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Usuario"
            className="icono-usuario"
          />
        </div>
      </header>

      <div className="container">
        <h2>Insertar nuevo producto</h2>
        <form className="form-grid" onSubmit={handleSubmit}>
          {/* COLUMNA IZQUIERDA */}
          <div className="left-column">
            {/* Campo 01 */}
            {/* Sección de imagen */}
            <div className="image-section">
              <div
                className="image-box"
                id="preview"
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "15px",
                    }}
                  />
                ) : (
                  "png/jpg/jpeg"
                )}
              </div>
              <input
                type="file"
                id="inputImagen"
                name="imagen"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleChange}
              />
            </div>

            {/* Campo adicional con lápiz */}
            <div className="campo-adicional">
              <input
                type="text"
                name="campoAdicional"
                placeholder="..."
                value={formData.campoAdicional}
                onChange={handleChange}
              />
            </div>

            {/* Botones de acción */}
            <div className="actions">
              <button className="btn" type="button" onClick={handleGoBack}>
                Regresar
              </button>
              <button className="btn" type="submit">
                Guardar
              </button>
            </div>
          </div>

          {/* COLUMNA DERECHA */}
          <div className="right-column">
            {/* Grid de campos */}
            <div className="fields">
              <div className="field">
                <label>Altura</label>
                <input
                  type="text"
                  name="altura"
                  placeholder="..."
                  value={formData.altura}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Peso</label>
                <input
                  type="text"
                  name="peso"
                  placeholder="..."
                  value={formData.peso}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Color</label>
                <input
                  type="text"
                  name="color"
                  placeholder="..."
                  value={formData.color}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Aplicación</label>
                <input
                  type="text"
                  name="aplicacion"
                  placeholder="..."
                  value={formData.aplicacion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Material</label>
                <input
                  type="text"
                  name="material"
                  placeholder="..."
                  value={formData.material}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Marca</label>
                <input
                  type="text"
                  name="marca"
                  placeholder="..."
                  value={formData.marca}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Garantía</label>
                <input
                  type="text"
                  name="garantia"
                  placeholder="..."
                  value={formData.garantia}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Precio x m2</label>
                <input
                  type="text"
                  name="precio"
                  placeholder="..."
                  value={formData.precio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Descuento</label>
                <input
                  type="text"
                  name="descuento"
                  placeholder="..."
                  value={formData.descuento}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Descripción del producto */}
            <div className="description">
              <label>Descripción del producto</label>
              <textarea
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
