// Gestión de Usuarios - Página para administradores
// Permite ver, editar y eliminar usuarios del sistema

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css'; // Reutilizamos estilos de admin

export default function Usuarios() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    // Simulación de datos (a conectar con backend real más adelante)
    useEffect(() => {
        // Aquí iría el fetch a /api/usuarios
        setTimeout(() => {
            setUsuarios([
                { id: 1, nombre: 'Admin Principal', email: 'admin@gramas.com', rol: 'Administrador', estado: 'Activo' },
                { id: 2, nombre: 'Cliente Ejemplo', email: 'cliente@email.com', rol: 'Cliente', estado: 'Activo' },
                { id: 3, nombre: 'Juan Pérez', email: 'juan@email.com', rol: 'Cliente', estado: 'Inactivo' },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div className="logo-section">
                    <h1 className="admin-title">Gestión de Usuarios</h1>
                </div>
                <button onClick={() => navigate('/panel-admin')} className="btn-volver">
                    Volver al Panel
                </button>
            </header>

            <main className="admin-content">
                <div className="table-container">
                    {loading ? (
                        <p>Cargando usuarios...</p>
                    ) : (
                        <table className="data-table">
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
                                        <td>{user.estado}</td>
                                        <td>
                                            <button className="btn-action btn-edit">Editar</button>
                                            <button className="btn-action btn-delete">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
}
