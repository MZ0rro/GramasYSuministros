<<<<<<< HEAD
// frontend/src/components/panel_administrador/reportes.jsx
import React from 'react';
import '../styles/admin.css';
import '../styles/reportes.css';

const Reportes = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  if (usuario.rol !== 1) {
    window.location.href = '/inicio_sesion.php';
    return null;
  }

  return (
    <>
      <header className="reportes-header">
        <div className="logo">
          <imgоте src="/frontend/estilos/logo.png" alt="Logo" />
          <div>
            <span>Gramas y Suministros</span>
            <small>Synthetic Grass</small>
          </div>
        </div>
        <div className="reportes-title">Administración de reportes</div>
        <div className="user-icon">
          <div className="icon-circle"></div>
        </div>
      </header>

      <div className="reportes-greeting">
        <h1>Reportes del sistema</h1>
      </div>

      <div className="reportes-question">
        <h2>¿Qué desea hacer?</h2>
      </div>

      <div className="reportes-options">
        <div className="reportes-card"><div className="icon-ventas"></div><h3>ventas</h3></div>
        <div className="reportes-card"><div className="icon-productos"></div><h3>Productos mas vendidos</h3></div>
        <div className="reportes-card"><div className="icon-usuarios"></div><h3>Usuarios registrados</h3></div>
        <div className="reportes-card"><div className="icon-cotizaciones"></div><h3>Cotizaciones generadas</h3></div>
        <div className="reportes-card"><div className="icon-pedidos"></div><h3>Pedidos finales</h3></div>
      </div>

      <div style={{ textAlign: 'center', margin: '40px' }}>
        <button onClick={() => window.location.href = '/frontend/src/index.html#/panel-admin'} className="btn-volver">
          Volver al Panel
        </button>
      </div>
    </>
  );
};

=======
// frontend/src/components/panel_administrador/reportes.jsx
import React from 'react';
import '../styles/admin.css';
import '../styles/reportes.css';

const Reportes = () => {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  if (usuario.rol !== 1) {
    window.location.href = '/inicio_sesion.php';
    return null;
  }

  return (
    <>
      <header className="reportes-header">
        <div className="logo">
          <imgоте src="/frontend/estilos/logo.png" alt="Logo" />
          <div>
            <span>Gramas y Suministros</span>
            <small>Synthetic Grass</small>
          </div>
        </div>
        <div className="reportes-title">Administración de reportes</div>
        <div className="user-icon">
          <div className="icon-circle"></div>
        </div>
      </header>

      <div className="reportes-greeting">
        <h1>Reportes del sistema</h1>
      </div>

      <div className="reportes-question">
        <h2>¿Qué desea hacer?</h2>
      </div>

      <div className="reportes-options">
        <div className="reportes-card"><div className="icon-ventas"></div><h3>ventas</h3></div>
        <div className="reportes-card"><div className="icon-productos"></div><h3>Productos mas vendidos</h3></div>
        <div className="reportes-card"><div className="icon-usuarios"></div><h3>Usuarios registrados</h3></div>
        <div className="reportes-card"><div className="icon-cotizaciones"></div><h3>Cotizaciones generadas</h3></div>
        <div className="reportes-card"><div className="icon-pedidos"></div><h3>Pedidos finales</h3></div>
      </div>

      <div style={{ textAlign: 'center', margin: '40px' }}>
        <button onClick={() => window.location.href = '/frontend/src/index.html#/panel-admin'} className="btn-volver">
          Volver al Panel
        </button>
      </div>
    </>
  );
};

>>>>>>> molina
export default Reportes;