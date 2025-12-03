// QuienesSomos.jsx - Página dedicada a la información de la empresa
import { useNavigate } from 'react-router-dom';
import '../styles/quienes-somos.css';

export default function QuienesSomos() {
    const navigate = useNavigate();

    return (
        <div className="quienes-somos-container">
            <header className="qs-header">
                <button onClick={() => navigate('/')} className="btn-back">
                    ← Volver al Catálogo
                </button>
                <h1>Quiénes Somos</h1>
            </header>

            <main className="qs-content">
                {/* Sección Principal con Imagen */}
                <section className="qs-hero">
                    <div className="qs-hero-text">
                        <h2 className="outlined-text">Nuestra Historia</h2>
                        <p className="outlined-text-p">
                            En <strong>Gramas y Suministros</strong>, llevamos más de una década transformando espacios.
                            Lo que comenzó como un pequeño proyecto de paisajismo se ha convertido en una referencia
                            nacional en la instalación de superficies deportivas y decorativas.
                        </p>
                    </div>
                    <div className="qs-hero-image">
                        <div className="placeholder-img-large">🏢</div>
                    </div>
                </section>

                {/* Misión y Visión */}
                <section className="qs-mission-vision">
                    <div className="mv-card">
                        <div className="mv-icon">🎯</div>
                        <h2 className="outlined-text">Misión</h2>
                        <p className="outlined-text-p">
                            Proveer soluciones integrales de paisajismo y superficies sintéticas de la más alta calidad,
                            superando las expectativas de nuestros clientes mediante la innovación constante,
                            el compromiso con la sostenibilidad y un servicio al cliente excepcional.
                            Nos esforzamos por crear espacios verdes que mejoren la calidad de vida y fomenten
                            el deporte y la recreación.
                        </p>
                    </div>

                    <div className="mv-card">
                        <div className="mv-icon">👁️</div>
                        <h2 className="outlined-text">Visión</h2>
                        <p className="outlined-text-p">
                            Ser reconocidos en 2030 como la empresa líder en Colombia en el suministro e instalación
                            de grama sintética y soluciones para jardinería, destacándonos por nuestra tecnología de vanguardia,
                            responsabilidad ambiental y por ser el aliado preferido de constructores,
                            instituciones deportivas y hogares colombianos.
                        </p>
                    </div>
                </section>

                {/* Galería / Valores */}
                <section className="qs-values">
                    <h2 className="outlined-text section-center">Nuestros Valores</h2>
                    <div className="values-grid">
                        <div className="value-item">
                            <h3>Calidad</h3>
                            <p>No negociamos la excelencia de nuestros productos.</p>
                        </div>
                        <div className="value-item">
                            <h3>Integridad</h3>
                            <p>Actuamos con honestidad y transparencia en cada proyecto.</p>
                        </div>
                        <div className="value-item">
                            <h3>Innovación</h3>
                            <p>Buscamos constantemente nuevas tecnologías y métodos.</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="qs-footer">
                <p>© 2024 Gramas y Suministros</p>
            </footer>
        </div>
    );
}
