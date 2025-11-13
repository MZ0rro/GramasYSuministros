import { useState, useEffect } from "react"; // ✅ Faltaba useEffect
import { Link, useNavigate } from "react-router-dom";
import "../estilos/Stock.css";
import logo from "../assets/logo.png";

const Stock = () => {
  const [productos, setProductos] = useState([]);

  // ✅ Cargar productos desde el backend PHP
  useEffect(() => {
    fetch("http://localhost:8000/stock.php")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) =>
        console.error("Error al obtener los productos:", error)
      );
  }, []);

  return (
    <div>
      <header>
        <div className="logo">
          <img src={logo} alt="Logo de Gramas y Suministros" />
        </div>
        <h1>Administrar Inventarios</h1>
        <div className="header-right">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Usuario"
            className="icono-usuario"
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
            {productos.length > 0 ? (
              productos.map((producto) => (
                <tr key={producto.id_producto}>
                  <td>{producto.id_producto}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.stock}</td>
                  <td
                    className={
                      producto.estado === "Activo"
                        ? "estado-activo"
                        : producto.estado === "Alerta"
                        ? "estado-alerta"
                        : "estado-inactivo"
                    }
                  >
                    {producto.estado}
                  </td>
                  <td>
                    <button className="btn">Ver y agregar nueva entrada</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Cargando productos...</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="bottom-button">
          {/* ✅ Cambiado a Link para navegación SPA */}
          <Link to="/dashboard">
            <button className="btn1">Regresar</button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Stock;
