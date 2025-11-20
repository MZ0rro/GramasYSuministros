import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Perfil.css";

const Perfil = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
  });

  const [original, setOriginal] = useState({});
  const [cambios, setCambios] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // Obtener id_usuario desde el token
  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id_usuario;
    } catch (err) {
      console.error("Error decodificando token", err);
      return null;
    }
  };

  useEffect(() => {
    const id = getUserIdFromToken();
    if (!id) return;

    fetch(`http://localhost:5000/api/perfil/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUsuario(data);
        setOriginal(data);
      })
      .catch(err => console.error("Error obteniendo perfil:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Solo detectar cambios
    setUsuario({ ...usuario, [name]: value });

    if (value !== original[name]) {
      setCambios(true);
    }
  };

  const guardar = async () => {
    const id = getUserIdFromToken();
    if (!id) return;

    const res = await fetch(`http://localhost:5000/api/perfil/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const data = await res.json();

    if (data.success) {
      setMensaje("Información guardada correctamente ✔");
      setCambios(false);
      setOriginal(usuario);

      setTimeout(() => setMensaje(""), 3000);
    }
  };

  return (
    <div className="perfil-container">
      
      {mensaje && <div className="mensaje-exito">{mensaje}</div>}

      <h2 className="titulo-perfil">Mi Perfil</h2>

      <div className="perfil-card">

        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={usuario.nombre}
          onChange={handleChange}
        />

        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          value={usuario.apellido}
          onChange={handleChange}
        />

        <label>Correo electrónico</label>
        <input
          type="email"
          name="email"
          required
          value={usuario.email}
          onChange={handleChange}
        />
      </div>

      {cambios && (
        <button className="btn-guardar" onClick={guardar}>
          Guardar cambios
        </button>
      )}
    </div>
  );
};

export default Perfil;
