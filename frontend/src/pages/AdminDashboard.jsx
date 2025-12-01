// AdminDashboard - Panel principal de administración
// Permite navegar a las diferentes secciones de gestión: usuarios, inventario, cotizaciones y reportes

import { useEffect, useState } from 'react'; // Hooks de React
import { useNavigate } from 'react-router-dom'; // Para navegación
import '../styles/admin.css'; // Estilos del panel admin

export default function AdminDashboard() {
  // Hook de navegación
  const navigate = useNavigate();

  // Estado para el nombre del usuario
  const [userName, setUserName] = useState('Administrador');

  // useEffect para verificar autenticación al cargar
  useEffect(() => {
    // Obtiene datos del localStorage
    const usuario = localStorage.getItem('usuario');
    const rol = localStorage.getItem('id_rol');

    // Si hay usuario guardado, actualiza el estado
    if (usuario) {
      try {
        // Intenta parsear si es un objeto JSON
        const userObj = JSON.parse(usuario);
        setUserName(userObj.nombre || 'Administrador');
      } catch (e) {
        // Si es solo un string
        setUserName(usuario || 'Administrador');
      }
    } else {
      // Si no hay usuario en localStorage, intenta obtenerlo del nombre de usuario
      const storedName = localStorage.getItem('user_name');
      if (storedName) setUserName(storedName);
    }

    // Verificación de rol (1 = Admin)
    // Si no es admin, redirige al login
    if (rol !== '1') {
      // navigate('/login'); // Comentado para desarrollo, descomentar en producción
    }
  }, [navigate]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.clear(); // Limpia todo el localStorage
    navigate('/login'); // Redirige al login
  };

  return (
    // Contenedor principal con clase para estilos específicos
    <div className="admin-container">
      {/* Header del panel */}
      <header className="admin-header">
        {/* Logo y título */}
        <div className="logo-section">
          <div className="logo-icon"></div>
          <h1 className="admin-title">Panel Administrativo</h1>
        </div>

        {/* Sección de usuario y logout */}
        <div className="user-section">
          <div className="user-info">
            <span className="user-name">{userName}</span>
            <div className="user-avatar"></div>
          </div>
          <button onClick={handleLogout} className="logout-btn">
            Salir
          </button>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="admin-content">
        {/* Saludo de bienvenida */}
        <div className="welcome-banner">
          <h2>Bienvenido de nuevo</h2>
          <p>Selecciona una opción para comenzar a gestionar el sistema</p>
        </div>

        {/* Grid de opciones de menú */}
        <div className="menu-grid">
          {/* Opción: Control de Usuarios */}
          <div
            className="menu-card"
            onClick={() => navigate('/panel-admin/usuarios')} // Navegación al hacer clic
          >
            <div className="card-icon users-icon"></div>
            <h3>Control de usuarios</h3>
            <p>Gestionar cuentas y permisos</p>
          </div>

          {/* Opción: Administrar Inventarios */}
          <div
            className="menu-card"
            onClick={() => navigate('/panel-admin/inventario')} // Navegación al hacer clic
          >
            <div className="card-icon inventory-icon"></div>
            <h3>Administrar inventarios</h3>
            <p>Control de stock y productos</p>
          </div>

          {/* Opción: Generar Cotizaciones */}
          <div
            className="menu-card"
            onClick={() => navigate('/panel-admin/cotizaciones')} // Navegación al hacer clic
          >
            <div className="card-icon quotes-icon"></div>
            <h3>Generar Cotizaciones</h3>
            <p>Crear y enviar presupuestos</p>
          </div>
        </div>

        {/* Botón grande para ir a reportes */}
        <div className="reports-section">
          <button
            className="reports-btn"
            onClick={() => navigate('/panel-admin/reportes')} // Navegación a reportes
          >
            <span className="btn-icon">📊</span>
            Ir a reportes y estadísticas
          </button>
        </div>
      </main>
    </div>
  );
}