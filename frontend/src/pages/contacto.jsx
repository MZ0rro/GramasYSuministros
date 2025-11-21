import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Contacto.css";

function getUser() {
  try {
    const data = localStorage.getItem("user");
    if (!data || data === "undefined") return null;
    return JSON.parse(data);
  } catch {
    return null;
  }
}

const Contacto = () => {
  const navigate = useNavigate();
  const user = getUser();

  const nombreUsuario = user?.nombre || "usuario";

  return (
    <div className="contacto-container">

      <header className="contacto-header">
        <h2>Contacto</h2>

        {/* Si no hay usuario, el icono lleva a iniciar sesión */}
        <button
          className="icon-button"
          onClick={() => navigate(user ? "/perfil" : "/login")}
        >
          👤
        </button>
      </header>

      <h3 className="saludo">¡Hola {nombreUsuario}!</h3>
      <p className="subtitulo">¿Qué desea hacer?</p>

      <div className="opciones-box">

        {/* SOLO SE MUESTRA SI HAY SESIÓN */}
        {user && (
          <div
            className="opcion-card"
            onClick={() => navigate("/dashboard")}
          >
            <div className="icon">👤</div>
            <p>Ver/editar perfil</p>
          </div>
        )}

        {/* SI NO HAY SESIÓN → mostrar botón para iniciar sesión */}
        {!user && (
          <div
            className="opcion-card"
            onClick={() => navigate("/login")}
          >
            <div className="icon">🔑</div>
            <p>Iniciar sesión</p>
          </div>
        )}

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

      <button className="volver-btn" onClick={() => navigate("/")}>
        Volver
      </button>
    </div>
  );
};

export default Contacto;
    