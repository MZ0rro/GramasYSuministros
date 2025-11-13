import React, { useState } from "react";
import "./estilos/registro.css"; // Usa tu mismo archivo de estilos

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [mensaje, setMensaje] = useState("");

  // Captura los cambios en los campos
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Manejador de envío
  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes conectar con tu API más adelante
    // por ahora solo simula un registro exitoso
    setMensaje("✅ Registro exitoso. Ahora puede iniciar sesión.");

    // Limpia el formulario
    setFormData({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src="estilos/logo.png" alt="Logo de Gramas y Suministros" />
          <h1>Gramas y Suministros</h1>
        </div>
        <nav>
          <a href="index.php">Inicio</a>
          <a href="inicio_sesion.php">Iniciar sesión</a>
        </nav>
      </header>

      <main>
        <h2
          style={{
            textAlign: "center",
            color: "var(--verde)",
            marginBottom: "20px",
          }}
        >
          Crear cuenta
        </h2>

        {mensaje && (
          <p style={{ textAlign: "center", color: "green" }}>{mensaje}</p>
        )}

        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />

          <label>Correo electrónico</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="boton">
            Registrarse
          </button>
        </form>
      </main>

      <footer>© 2025 Gramas y Suministros — Todos los derechos reservados.</footer>
    </div>
  );
}

