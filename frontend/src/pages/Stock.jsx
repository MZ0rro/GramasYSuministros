import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Stock.css";

const StockGrama = () => {
  const navigate = useNavigate();

  const [productos] = useState([
    {
      id: "01",
      nombre: "Grama para jardín",
      stock: 156,
      estado: "Activo",
      claseEstado: "estado-activo",
    },
    {
      id: "02",
      nombre: "Grama deportiva",
      stock: 14,
      estado: "Alerta",
      claseEstado: "estado-alerta",
    },
    {
      id: "03",
      nombre: "Grama para terraza",
      stock: 133,
      estado: "Activo",
      claseEstado: "estado-activo",
    },
    {
      id: "04",
      nombre: "Grama de parque",
      stock: 0,
      estado: "Inactivo",
      claseEstado: "estado-inactivo",
    },
  ]);

  const handleVerHistorial = (id) => {
    console.log(`Ver historial del producto ${id}`);
    // Aquí puedes agregar la lógica para ver el historial
  };

  const handleRegresar = () => {
    navigate("/inventario-grama");
  };

  return (
    <>
      <header>
        <div className="logo">
          <img
            src="/Img/Captura de pantalla 2025-11-01 190719.png"
            alt="Logo"
          />
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
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.stock}</td>
                <td className={producto.claseEstado}>{producto.estado}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => {
                      handleVerHistorial(producto.id);
                      navigate("/historial");
                    }}
                  >
                    Ver y agregar nueva entrada
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bottom-button">
          <button className="btn1" onClick={() => navigate("/Inventario")}>
            Regresar
          </button>
        </div>
      </main>
    </>
  );
};

export default StockGrama;
