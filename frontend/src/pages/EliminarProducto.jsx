import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EliminarProducto.css";

export default function EliminarProducto() {
  const navigate = useNavigate();

  const [datos, setDatos] = useState([
    {
      id: "01",
      producto: "Grama para jardín",
      altura: "40mm",
      peso: "49kg",
      stock: 156,
      precio: "67.900",
    },
    {
      id: "02",
      producto: "Grama deportiva",
      altura: "16mm",
      peso: "25kg",
      stock: 14,
      precio: "43.900",
    },
    {
      id: "03",
      producto: "Grama para terraza",
      altura: "32mm",
      peso: "41kg",
      stock: 133,
      precio: "59.900",
    },
    {
      id: "04",
      producto: "Grama de parque",
      altura: "20mm",
      peso: "29kg",
      stock: 0,
      precio: "35.900",
    },
  ]);

  const eliminarFila = (id) => {
    setDatos((prev) => prev.filter((fila) => fila.id !== id));
  };

  return (
    <div className="#">
      <header>
        <div className="logo">
          <div className="logo-placeholder"></div>
        </div>

        <h2>Administrar Inventarios</h2>

        <div className="user-icon"></div>
      </header>

      <main>
        <h1>Inventario de Grama Sintética</h1>

        <div className="table-wrapper">
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
              {datos.map((fila) => (
                <tr key={fila.id}>
                  <td>{fila.id}</td>
                  <td>{fila.producto}</td>
                  <td>{fila.altura}</td>
                  <td>{fila.peso}</td>
                  <td>{fila.stock}</td>
                  <td>{fila.precio}</td>
                  <td>
                    <button
                      className="eliminar"
                      onClick={() => eliminarFila(fila.id)}
                    >
                      <span>🗑️</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          className="regresar"
          onClick={() => {
            navigate("/Inventario");
          }}
        >
          Regresar
        </button>
      </main>
    </div>
  );
}
