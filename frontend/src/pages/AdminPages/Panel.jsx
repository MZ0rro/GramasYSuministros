import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavComponent from "../../components/GlobalNav";
import StatsCard from "../../components/StatsCard";
import "../../styles/Panel.css";

export default function PanelAdmin() {
  const navigate = useNavigate();

  // ====== USUARIO DESDE LOCALSTORAGE (MISMA LÓGICA QUE PERFIL) ======
  const rawUsuario = localStorage.getItem("usuario");
  let usuario = null;

  try {
    usuario = rawUsuario ? JSON.parse(rawUsuario) : null;
  } catch {
    usuario = null;
  }

  // ====== PROTECCIÓN DE RUTA ======
  useEffect(() => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    if (usuario.id_rol !== 1) {
      navigate("/perfil"); // cliente no entra al panel
    }
  }, [usuario, navigate]);

  if (!usuario || usuario.id_rol !== 1) return null;

  // ====== ESTADOS ======
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalProductos: 0,
    totalStock: 0,
    productosAgotados: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ====== FETCH DE ESTADÍSTICAS ======
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productosRes = await fetch("http://localhost:3001/api/productos");
        const productosData = await productosRes.json();

        const stockRes = await fetch("http://localhost:3001/api/stock");
        const stockData = await stockRes.json();

        const totalStock = stockData.reduce(
          (sum, item) => sum + (item.cantidad_actual || 0),
          0
        );

        const productosAgotados = stockData.filter(
          item => item.cantidad_actual === 0
        ).length;

        setStats({
          totalUsuarios: 5, // temporal
          totalProductos: productosData.length,
          totalStock,
          productosAgotados
        });

        setLoading(false);
      } catch (err) {
        setError("Error al cargar estadísticas");
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // ====== LOGOUT UNIFICADO ======
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      
      <NavComponent />

      <div className="dashboard-welcome">
        <h3>Bienvenido, {usuario.nombre}</h3>
        <p>Rol: Administrador</p>
      </div>

      <section className="dashboard-stats-section">
        <h3>Estadísticas del sistema</h3>

        {loading && <p>Cargando estadísticas...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <div className="stats-grid">
            <StatsCard
              icon="icon-users"
              title="Total Usuarios"
              value={stats.totalUsuarios}
              color="blue"
            />

            {/* Tarjeta de total de productos */}
            <StatsCard
              icon="icon-products"
              title="Total Productos"
              value={stats.totalProductos}
              color="green"
            />

            {/* Tarjeta de stock total */}
            <StatsCard
              icon="icon-stock"
              title="Stock Total"
              value={stats.totalStock}
              color="purple"
            />

            {/* Tarjeta de productos agotados */}
            <StatsCard
              icon="icon-alert"
              title="Productos Agotados"
              value={stats.productosAgotados}
              color="orange"
            />
          </div>
        )}
      </section>

      {/* Sección de acciones rápidas */}
      <div className="dashboard-actions">
        <h3 className="section-title-v2">Acceso Rápido</h3>

        {/* Grid de botones de acción */}
        <div className="actions-grid">
          {/* Botón para ir al panel de administración */}
          <button
            className="action-card"
            onClick={() => navigate('/usuarios')}
          >
            <div className="action-icon icon-admin"></div>
            <h4>Panel de Administración</h4>
            <p>Gestionar usuarios, inventario y reportes</p>
          </button>

          {/* Botón para ir a reportes */}
          <button
            className="action-card"
            onClick={() => navigate('/reportes')}
          >
            <div className="action-icon icon-reports"></div>
            <h4>Ver Reportes</h4>
            <p>Estadísticas y análisis del sistema</p>
          </button>

          {/* Botón para ir a inventario */}
          <button
            className="action-card"
            onClick={() => navigate('/dashboard')}
          >
            <div className="action-icon icon-inventory-action"></div>
            <h4>Gestionar Inventario</h4>
            <p>Administrar productos y stock</p>
          </button>
        </div>
      </div>
    </div>
  );
}
