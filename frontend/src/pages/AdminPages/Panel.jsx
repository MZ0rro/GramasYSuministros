import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Panel.css";
import Footer from "../../components/Footer";
import NavComponent from "../../components/GlobalNav";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);
  const [stats, setStats] = useState({
    usuarios: 0,
    productos: 0,
    stock: 0,
    agotados: 0
  });

  useEffect(() => {
    obtenerDatos();
  }, []);

const obtenerDatos = async () => {
  try {

    // 🔹 Productos
    const productosRes = await fetch("http://localhost:3001/api/inventario");
    const productosData = await productosRes.json();
    setProductos(productosData);

    // 🔹 Usuarios (ahora reales)
    const usuariosRes = await fetch("http://localhost:3001/api/usuarios");
    const usuariosData = await usuariosRes.json();

    // 🔹 Stock
    const stockRes = await fetch("http://localhost:3001/api/stock");
    const stockData = await stockRes.json();

    const totalStock = stockData.reduce(
      (sum, item) => sum + (item.cantidad_actual || 0),
      0
    );

    const agotados = stockData.filter(
      item => item.cantidad_actual === 0
    ).length;

    setStats({
      usuarios: usuariosData.length, // 👈 ahora real
      productos: productosData.length,
      stock: totalStock,
      agotados
    });

  } catch (err) {
    console.log(err);
  }
};


  return (

    <>

    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Dashboard</h2>

        <nav>
          <button onClick={() => navigate("/panel")}>Inventario</button>
          <button onClick={() => navigate("/usuarios")}>Usuarios</button>
          <button onClick={() => navigate("/stock")}>Stock</button>
          <button onClick={() => navigate("/reportes")}>Reportes</button>
          <button onClick={() => navigate("/")}>Catalogo</button>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="main-area">

        {/* STATS */}
        <section className="stats-row">
          <div className="stat-card green">
            <h3>{stats.productos}</h3>
            <p>Productos</p>
          </div>

          <div className="stat-card purple">
            <h3>{stats.usuarios}</h3>
            <p>Usuarios</p>
          </div>

          <div className="stat-card blue">
            <h3>{stats.stock}</h3>
            <p>Stock Total</p>
          </div>

          <div className="stat-card orange">
            <h3>{stats.agotados}</h3>
            <p>Agotados</p>
          </div>
        </section>

        {/* TABLA */}
        <section className="table-section">
  <div className="table-card">

    <div className="table-header">
      <h3>Inventario</h3>
      <div className="table-actions">
        <button className="btn-secondary" onClick={() => navigate("/eliminarProducto")}>Eliminar</button>
        <button className="btn-primary" onClick={() => navigate("/insertarProducto")}>Agregar</button>
      </div>
    </div>

    <div className="table-container">

          <table className="admin-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Altura</th>
                <th>Peso</th>
                <th>Material</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Extras</th>
              </tr>
            </thead>

            <tbody>
              {productos.map(p => (
                <tr key={p.id_producto}>
                  <td>{p.id_producto}</td>
                  <td>{p.nombre}</td>
                  <td>{p.altura ? `${p.altura} mm` : "N/A"}</td>
                  <td>{p.peso ? `${p.peso} kg` : "N/A"}</td>
                  <td>{p.material || "N/A"}</td>
                  <td>{p.marca || "N/A"}</td>
                  <td>${p.precio}</td>
                  <td>
                    <button
                      className="btn-extra"
                      onClick={() => navigate(`/editar-producto/${p.id_producto}`)}
                    >
                      Modificar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
              </div>
        </section>

      </div>
    </div>

    <Footer />

    </>
  );
}
