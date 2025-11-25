import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InventarioGrama.css";

const InventarioGrama = () => {
  const navigate = useNavigate();

  const [productos] = useState([
    {
      id: "01",
      nombre: "Grama para jardín",
      altura: "40mm",
      peso: "49kg",
      stock: 156,
      precio: "67,900",
    },
    {
      id: "02",
      nombre: "Grama deportiva",
      altura: "10mm",
      peso: "25kg",
      stock: 14,
      precio: "43,900",
    },
    {
      id: "03",
      nombre: "Grama para terraza",
      altura: "35mm",
      peso: "4kg",
      stock: 133,
      precio: "59,900",
    },
    {
      id: "04",
      nombre: "Grama de parque",
      altura: "20mm",
      peso: "29kg",
      stock: 0,
      precio: "35,900",
    },
  ]);

  const [menuAbierto, setMenuAbierto] = useState(null);

  const toggleMenu = (event, menuId) => {
    event.stopPropagation();
    setMenuAbierto(menuAbierto === menuId ? null : menuId);
  };

  const cerrarMenus = () => {
    setMenuAbierto(null);
  };

  const masInfo = (id) => {
    navigate(`/mas-info/${id}`);
  };

  const editarProducto = (id) => {
    navigate(`/editar-producto/${id}`);
  };

  const verStock = (id) => {
    navigate(`/stock/${id}`);
  };

  const eliminarProducto = (id) => {
    navigate(`/eliminar-producto/${id}`);
  };

  const handleRegresar = () => {
    navigate("/admin-inventarios");
  };

  const handleAgregar = () => {
    navigate("/agregar-producto");
  };

  // Cerrar menús al hacer clic fuera
  useState(() => {
    document.addEventListener("click", cerrarMenus);
    return () => {
      document.removeEventListener("click", cerrarMenus);
    };
  }, []);

  return (
    <>
      <header>
        <div className="logo">
          <img
            src="https://via.placeholder.com/50x50/9fcea8/2c5234?text=Logo"
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
        <div className="top-section">
          <button className="btn-regresar" onClick={handleRegresar}>
            Regresar
          </button>
          <h2>Inventario de Grama Sintética</h2>
          <button
            className="btn-agregar"
            onClick={() => navigate("/InsertarProducto")}
          >
            +
          </button>
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
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.nombre}</td>
                <td>{producto.altura}</td>
                <td>{producto.peso}</td>
                <td>{producto.stock}</td>
                <td>{producto.precio}</td>
                <td>
                  <button
                    className="btn-options"
                    onClick={(e) => toggleMenu(e, `menu${producto.id}`)}
                  >
                    ...
                  </button>
                  <div
                    className={`dropdown-menu ${
                      menuAbierto === `menu${producto.id}` ? "show" : ""
                    }`}
                    id={`menu${producto.id}`}
                  >
                    <button
                      onClick={() => {
                        navigate("#");
                      }}
                    >
                      Mas Info.
                    </button>

                    <button
                      onClick={() => {
                        navigate("#");
                      }}
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => {
                        navigate("/Stock");
                      }}
                    >
                      Stock
                    </button>

                    <button
                      onClick={() => {
                        navigate("/EliminarProducto");
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bottom-button">
          <button className="btn-regresar-bottom" onClick={handleRegresar}>
            Regresar
          </button>
        </div>
      </main>
    </>
  );
};

export default InventarioGrama;
