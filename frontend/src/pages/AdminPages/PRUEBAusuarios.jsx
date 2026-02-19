// Gestión de Usuarios - Página para administradores
// Permite ver, editar y eliminar usuarios del sistema

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PRUEBAusuarios.css'; // Reutilizamos estilos de admin
import NavComponent from "../../components/GlobalNav";

export default function Usuarios() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulación de datos (a conectar con backend real más adelante)
    useEffect(() => {
        // Aquí iría el fetch a /api/usuarios
        setTimeout(() => {
            setUsuarios([
                { id: 1, nombre: 'Carlos Gómez', email: 'carlos.admin@example.com', rol: 'Administrador', estado: 'Activo' },
                { id: 2, nombre: 'Laura Pérez', email: 'laura.admin@example.com', rol: 'Administrador', estado: 'Activo' },
                { id: 3, nombre: 'Juan Martínez', email: 'sofia.cliente@example.com', rol: 'Cliente', estado: 'Activo' },
                { id: 4, nombre: 'Sofía Torres', email: 'sofia.cliente@example.com', rol: 'Cliente', estado: 'Activo' },
                { id: 5, nombre: 'Andrés Ramírez', email: 'andres.cliente@example.com', rol: 'Cliente', estado: 'Activo' },
                { id: 6, nombre: 'Santiago Rodríguez', email: 'santidavila233@gmail.com', rol: 'Administrador', estado: 'Activo' },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
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

      <section className="table-section">
        <div className="table-card">

          <div className="table-header">
            <h3>Gestión de Usuarios</h3>
            <div className="table-actions">
              <button className="btn-primary">
                Nuevo Usuario
              </button>
            </div>
          </div>

          <div className="table-container">

            {loading ? (
              <p style={{ padding: "20px" }}>Cargando usuarios...</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.nombre}</td>
                      <td>{user.email}</td>

                      <td>
                        <span className={`badge ${user.rol === 'Administrador' ? 'badge-admin' : 'badge-client'}`}>
                          {user.rol}
                        </span>
                      </td>

                      <td>
                        <span className="status estado-activo">
                          {user.estado}
                        </span>
                      </td>

                      <td>
                        <button className="btn-extra">Editar</button>
                        <button className="btn-danger">Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        </div>
      </section>

    </div>
  </div>
);

}
