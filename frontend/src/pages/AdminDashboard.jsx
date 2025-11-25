// frontend/src/components/panel_administrador/dashboard.jsx
import '../styles/admin.css';

const AdminDashboard = () => {
  // Lee la sesión que puso PHP en localStorage
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const nombre = usuario.nombre || 'Admin';
  const rol = usuario.rol || 0;

  // Protección: solo admins
  if (rol !== 1) {
    window.location.href = '/inicio_sesion.php';
    return null;
  }

  return (
    <div className="admin-container">
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <div>
            <span>Gramas y Suministros</span>
            <small>Synthetic Grass</small>
          </div>
        </div>
        <div className="title">Panel de administración</div>
        <div className="user-icon">
          <div className="icon-circle"></div>
        </div>
      </header>

      <div className="greeting">
        <h1>¡Hola ({nombre})!</h1>
        <button onClick={() => window.location.href = '/dashboard.php'} className="btn-volver">
          Volver
        </button>
      </div>

      <div className="question">
        <h2>¿Qué desea hacer?</h2>
      </div>

      <div className="options">
        <div className="card">
          <div className="icon-user"></div>
          <h3>Control de usuarios</h3>
        </div>
        <div className="card">
          <div className="icon-inventory"></div>
          <h3>Administrar inventarios</h3>
        </div>
        <div className="card">
          <div className="icon-quote"></div>
          <h3>Generar Cotizaciones</h3>
        </div>
      </div>

      <div className="reportes-container">
        <a href="/frontend/src/index.html#/reportes" className="btn-reportes">
          Ir a reportes
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;