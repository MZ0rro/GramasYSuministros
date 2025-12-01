// Gestión de Inventario - Página para administradores
// Permite ver y gestionar el stock de productos

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

export default function Inventario() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInventario = async () => {
            try {
                // Obtenemos productos y stock
                const res = await fetch('http://localhost:3001/api/stock');
                const data = await res.json();
                setProductos(data);
                setLoading(false);
            } catch (error) {
                console.error("Error cargando inventario:", error);
                setLoading(false);
            }
        };

        fetchInventario();
    }, []);

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div className="logo-section">
                    <h1 className="admin-title">Inventario y Stock</h1>
                </div>
                <button onClick={() => navigate('/panel-admin')} className="btn-volver">
                    Volver al Panel
                </button>
            </header>

            <main className="admin-content">
                <div className="actions-bar">
                    <button className="btn-primary">Agregar Nuevo Producto</button>
                    <input type="text" placeholder="Buscar producto..." className="search-input" />
                </div>

                <div className="table-container">
                    {loading ? (
                        <p>Cargando inventario...</p>
                    ) : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Stock Actual</th>
                                    <th>Stock Mínimo</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((prod, index) => (
                                    <tr key={index}>
                                        <td>{prod.nombre_producto}</td>
                                        <td>{prod.nombre_categoria || 'General'}</td>
                                        <td className="text-center font-bold">{prod.cantidad_actual}</td>
                                        <td className="text-center">{prod.stock_minimo || 10}</td>
                                        <td>
                                            {prod.cantidad_actual === 0 ? (
                                                <span className="badge badge-danger">Agotado</span>
                                            ) : prod.cantidad_actual < (prod.stock_minimo || 10) ? (
                                                <span className="badge badge-warning">Bajo Stock</span>
                                            ) : (
                                                <span className="badge badge-success">En Stock</span>
                                            )}
                                        </td>
                                        <td>
                                            <button className="btn-action btn-edit">Ajustar</button>
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
