import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Contacto.css";
import NavComponent from "../components/GlobalNav";
import GlobalButton from "../components/GlobalButton";

function getUser() {
  try {
    const data = localStorage.getItem("usuario");
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

      <NavComponent/>

      <h3 className="saludo">¡Hola, {nombreUsuario}!</h3>
      <p className="subtitulo">¿Qué desea hacer?</p>

      <center>
        <div className="opciones-box">

        {/* SOLO SE MUESTRA SI HAY SESIÓN */}
        {user && (
          <div className="opcion-card" onClick={() => navigate("/dashboard")}>
            <div className="icon">👤</div>
            <p>Ver/editar perfil</p>
          </div>
        )}

        {/* SI NO HAY SESIÓN → mostrar botón para iniciar sesión */}
        {!user && (
          <div className="opcion-card" onClick={() => navigate("/login")}>
            <div className="icon">🔑</div>
            <p>Iniciar sesión</p>
          </div>
        )}

        <div 
          className="opcion-card" onClick={() => navigate("/recuperar")}>
          <div className="icon">🔒</div>
          <p>Recuperar contraseña</p>
        </div>

        <div 
          className="opcion-card" onClick={() => navigate("/soporte")}>
          <div className="icon">☁️</div>
          <p>Soporte</p>
        </div>
      </div>
      </center>

        <br /><br /><br />
      <center><GlobalButton onClick={() => navigate(-1)} style={{ width: "20%" }}>Volver</GlobalButton></center>

    </div>
  );
};

export default Contacto;