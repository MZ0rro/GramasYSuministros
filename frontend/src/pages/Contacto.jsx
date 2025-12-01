// Contacto - Página pública de contacto
// Formulario para que los clientes envíen mensajes

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/contacto.css';

export default function Contacto() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Gracias por tu mensaje. Nos pondremos en contacto pronto.');
        setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    };

    return (
        <div className="contacto-container">
            <header className="contacto-header">
                <div className="logo-section">
                    <h1>Gramas y Suministros</h1>
                    <p>Contáctanos</p>
                </div>
                <button onClick={() => navigate('/login')} className="btn-volver">
                    Volver al Inicio
                </button>
            </header>

            <main className="contacto-content">
                <div className="contacto-card">
                    <h2>Envíanos un mensaje</h2>
                    <form onSubmit={handleSubmit} className="contacto-form">
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                placeholder="Tu nombre"
                            />
                        </div>

                        <div className="form-group">
                            <label>Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="tucorreo@ejemplo.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>Asunto</label>
                            <input
                                type="text"
                                name="asunto"
                                value={formData.asunto}
                                onChange={handleChange}
                                required
                                placeholder="Motivo de tu mensaje"
                            />
                        </div>

                        <div className="form-group">
                            <label>Mensaje</label>
                            <textarea
                                name="mensaje"
                                value={formData.mensaje}
                                onChange={handleChange}
                                required
                                placeholder="Escribe tu mensaje aquí..."
                                rows="5"
                            ></textarea>
                        </div>

                        <button type="submit" className="btn-enviar">
                            Enviar Mensaje
                        </button>
                    </form>
                </div>

                <div className="info-contacto">
                    <div className="info-item">
                        <span className="icon">📍</span>
                        <p>Bogotá, Colombia</p>
                    </div>
                    <div className="info-item">
                        <span className="icon">📞</span>
                        <p>+57 300 123 4567</p>
                    </div>
                    <div className="info-item">
                        <span className="icon">✉️</span>
                        <p>info@gramasysuministros.com</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
