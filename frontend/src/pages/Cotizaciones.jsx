// Generador de Cotizaciones - Página para administradores
// Permite crear cotizaciones para clientes

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin.css';

export default function Cotizaciones() {
    const navigate = useNavigate();

    return (
        <div className="admin-container">
            <header className="admin-header">
                <div className="logo-section">
                    <h1 className="admin-title">Generar Cotización</h1>
                </div>
                <button onClick={() => navigate('/panel-admin')} className="btn-volver">
                    Volver al Panel
                </button>
            </header>

            <main className="admin-content">
                <div className="construction-message">
                    <div className="icon-construction">🚧</div>
                    <h2>Módulo en Construcción</h2>
                    <p>Pronto podrás generar cotizaciones PDF desde aquí.</p>
                    <button onClick={() => navigate('/panel-admin')} className="btn-primary">
                        Regresar
                    </button>
                </div>
            </main>
        </div>
    );
}
