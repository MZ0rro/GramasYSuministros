// Dashboard del Administrador - Página principal después del login
// Muestra estadísticas del sistema y acceso rápido al panel de administración

import { useState, useEffect } from 'react'; // Hooks de React para estado y efectos
import { useNavigate } from 'react-router-dom'; // Para navegación entre páginas
import StatsCard from '../components/StatsCard'; // Componente de tarjeta de estadística
import '../styles/dashboard.css'; // Estilos específicos del dashboard

export default function Dashboard() {
  // Hook de navegación para cambiar de página
  const navigate = useNavigate();

  // Obtiene el token de autenticación del localStorage
  const token = localStorage.getItem("token");

  // Obtiene información del usuario del localStorage
  const userRole = parseInt(localStorage.getItem("id_rol"));
  const userName = localStorage.getItem("user_name") || "Administrador";

  // Estados para almacenar las estadísticas del backend
  const [stats, setStats] = useState({
    totalUsuarios: 0,      // Total de usuarios registrados
    totalProductos: 0,     // Total de productos en catálogo
    totalStock: 0,         // Total de unidades en stock
    productosAgotados: 0   // Productos sin stock
  });

  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(true);

  // Estado para manejar errores
  const [error, setError] = useState(null);

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    // Función asíncrona para obtener estadísticas del backend
    const fetchStats = async () => {
      try {
        // Petición para obtener todos los productos
        const productosRes = await fetch('http://localhost:3001/api/productos');
        const productosData = await productosRes.json();

        // Petición para obtener el stock
        const stockRes = await fetch('http://localhost:3001/api/stock');
        const stockData = await stockRes.json();

        // Calcula estadísticas a partir de los datos
        const totalProductos = productosData.length || 0;
        const totalStock = stockData.reduce((sum, item) => sum + (item.cantidad_actual || 0), 0);
        const productosAgotados = stockData.filter(item => item.cantidad_actual === 0).length;

        // Actualiza el estado con las estadísticas calculadas
        setStats({
          totalUsuarios: 5, // Por ahora hardcoded, se puede obtener del backend
          totalProductos,
          totalStock,
          productosAgotados
        });

        // Desactiva el estado de carga
        setLoading(false);
      } catch (err) {
        // Si hay error, lo guarda en el estado
        console.error('Error al obtener estadísticas:', err);
        setError('Error al cargar estadísticas');
        setLoading(false);
      }
    };

    // Ejecuta la función de obtener estadísticas
    fetchStats();
  }, []); // Array vacío significa que solo se ejecuta una vez al montar

  // Si no hay token, muestra mensaje de no autorizado
  if (!token) {
    return (
      <div className="dashboard-container">
        <h2>No autorizado - Por favor inicia sesión</h2>
      </div>
    );
  }

  // Función para cerrar sesión
  const handleLogout = () => {
    // Elimina el token y datos del usuario
    localStorage.removeItem('token');
    localStorage.removeItem('id_rol');
    localStorage.removeItem('user_name');
    // Redirige al login
    navigate('/login');
  };

  return (
    // Contenedor principal del dashboard
    <div className="dashboard-container">
      {/* Header del dashboard */}
      <header className="dashboard-header">
        {/* Logo y título */}
        <div className="dashboard-logo">
          <div className="logo-circle"></div>
          <div>
            <h1>Gramas y Suministros</h1>
            <p>Synthetic Grass</p>
          </div>
        </div>

        {/* Botón de cerrar sesión */}
        <button className="btn-logout" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </header>

      {/* Saludo personalizado */}
      <div className="dashboard-welcome">
        <h2>¡Bienvenido, {userName}!</h2>
        <p>Panel de Control - Administrador</p>
      </div>

      {/* Sección de estadísticas */}
      <div className="dashboard-stats-section">
        <h3 className="section-title">Estadísticas del Sistema</h3>

        {/* Muestra loading mientras carga */}
        {loading && <p className="loading-text">Cargando estadísticas...</p>}

        {/* Muestra error si hay */}
        {error && <p className="error-text">{error}</p>}

        {/* Grid de tarjetas de estadísticas */}
        {!loading && !error && (
          <div className="stats-grid">
            {/* Tarjeta de total de usuarios */}
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
      </div>

      {/* Sección de acciones rápidas */}
      <div className="dashboard-actions">
        <h3 className="section-title">Acceso Rápido</h3>

        {/* Grid de botones de acción */}
        <div className="actions-grid">
          {/* Botón para ir al panel de administración */}
          <button
            className="action-card"
            onClick={() => navigate('/panel-admin')}
          >
            <div className="action-icon icon-admin"></div>
            <h4>Panel de Administración</h4>
            <p>Gestionar usuarios, inventario y reportes</p>
          </button>

          {/* Botón para ir a reportes */}
          <button
            className="action-card"
            onClick={() => navigate('/panel-admin/reportes')}
          >
            <div className="action-icon icon-reports"></div>
            <h4>Ver Reportes</h4>
            <p>Estadísticas y análisis del sistema</p>
          </button>

          {/* Botón para ir a inventario */}
          <button
            className="action-card"
            onClick={() => navigate('/panel-admin/inventario')}
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
