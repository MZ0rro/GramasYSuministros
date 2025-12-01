// Componente StatsCard - Tarjeta reutilizable para mostrar estadísticas
// Se usa en el Dashboard para mostrar métricas como total de usuarios, productos, ventas, etc.

import '../styles/components.css'; // Importa los estilos del componente

// Props que recibe el componente:
// - icon: clase CSS para el icono (ej: 'icon-users')
// - title: título de la estadística (ej: 'Total Usuarios')
// - value: valor numérico a mostrar (ej: 150)
// - color: color del tema de la card (ej: 'blue', 'green', 'orange')
// - onClick: función opcional que se ejecuta al hacer clic
export default function StatsCard({ icon, title, value, color = 'blue', onClick }) {
    return (
        // Contenedor principal de la tarjeta con clase dinámica según el color
        <div
            className={`stats-card stats-card-${color}`} // Aplica color dinámico
            onClick={onClick} // Ejecuta función al hacer clic (si existe)
            style={{ cursor: onClick ? 'pointer' : 'default' }} // Cambia cursor si es clickeable
        >
            {/* Contenedor del icono con animación */}
            <div className={`stats-icon ${icon}`}></div>

            {/* Contenedor de la información */}
            <div className="stats-info">
                {/* Título de la estadística */}
                <h3 className="stats-title">{title}</h3>

                {/* Valor numérico con formato */}
                <p className="stats-value">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
            </div>
        </div>
    );
}
