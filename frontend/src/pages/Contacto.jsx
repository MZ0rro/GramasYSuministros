import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Contacto.css";

const Contacto = () => {
  const navigate = useNavigate();

  return (
    <div className="contacto-container">

      <header className="contacto-header">
        <h2>Contacto</h2>
        <button className="icon-button" onClick={() => navigate("/perfil")}>
          👤
        </button>
      </header>

      <h3 className="saludo">¡Hola (usuario)!</h3>
      <p className="subtitulo">¿Qué desea hacer?</p>

      <div className="opciones-box">
        <div 
          className="opcion-card"
          onClick={() => navigate("/perfil")}
        >
          <div className="icon">👤</div>
          <p>Ver/editar perfil</p>
        </div>

        <div 
          className="opcion-card"
          onClick={() => navigate("/recuperar")}
        >
          <div className="icon">🔒</div>
          <p>Recuperar contraseña</p>
        </div>

        <div 
          className="opcion-card"
          onClick={() => navigate("/soporte")}
        >
          <div className="icon">☁️</div>
          <p>Soporte</p>
        </div>
      </div>

      <button className="volver-btn" onClick={() => navigate("/catalogo")}>
        Volver
      </button>
    </div>
  );
};

export default Contacto;
