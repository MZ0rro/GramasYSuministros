import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/PRUEBAusuarios.css';
import NavComponent from "../../components/GlobalNav";

export default function Usuarios() {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 Cargar usuarios reales desde backend
    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/usuarios");
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error("Error cargando usuarios:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsuarios();
    }, []);

    // 🗑️ Eliminar usuario real
    const handleDelete = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;

        try {
            await fetch(`http://localhost:3001/api/usuarios/${id}`, {
                method: "DELETE"
            });

            setUsuarios(prev =>
                prev.filter(u => u.id_usuario !== id)
            );

        } catch (error) {
            console.error("Error eliminando usuario:", error);
        }
    };

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
                                <button
                                    className="btn-primary"
                                    onClick={() => navigate("/crear-usuario")}
                                >
                                    Nuevo Usuario
                                </button>
                            </div>
                        </div>

                        <div className="table-container">

                            {loading ? (
                                <p style={{ padding: "20px" }}>
                                    Cargando usuarios...
                                </p>
                            ) : usuarios.length === 0 ? (
                                <p style={{ padding: "20px" }}>
                                    No hay usuarios registrados
                                </p>
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
                                            <tr key={user.id_usuario}>
                                                <td>{user.id_usuario}</td>

                                                <td>
                                                    {user.nombre} {user.apellido}
                                                </td>

                                                <td>{user.email}</td>

                                                <td>
                                                    <span className={`badge ${
                                                        user.rol === 'administrador'
                                                            ? 'badge-admin'
                                                            : 'badge-client'
                                                    }`}>
                                                        {user.rol}
                                                    </span>
                                                </td>

                                                <td>
                                                    <span className={`status estado-${user.estado}`}>
                                                        {user.estado}
                                                    </span>
                                                </td>

                                                <td>
                                                    <button
                                                        className="btn-extra"
                                                        onClick={() =>
                                                            navigate(`/editar-usuario/${user.id_usuario}`)
                                                        }
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        className="btn-danger"
                                                        onClick={() => handleDelete(user.id_usuario)}
                                                    >
                                                        Eliminar
                                                    </button>
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