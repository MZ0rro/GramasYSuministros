import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginAndRegister.css";
import GlobalButton from "../components/GlobalButton";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    id_rol: 2 // Por defecto, usuario normal
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // evita recargar la página

    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMsg(data.message);

    if (res.ok) {
      localStorage.setItem("token", data.token);

      const role = data.role;

      if (role === 1) navigate("/dashboard");
      else navigate("/");
    }
  };

  return (
    <div className="auth-container">

      <GlobalButton onClick={() => navigate("/login")} style={{ width: "20%", position: "absolute", top: "30px", right: "40px" }}>Volver</GlobalButton>

      <div className="auth-card">

        <h1 className="auth-title">Crear cuenta</h1>
        <h2 className="auth-subtitle">Registro de usuario</h2>

        {/* ⬇️ FORMULARIO REAL CON VALIDACIÓN */}
        <form onSubmit={handleSubmit}>

          <label className="auth-label">Nombre</label>
          <div className="input-wrapper">
          <input className="input-field" type="text" name="nombre" onChange={handleChange}required/>
          </div>

          <label className="auth-label">Apellido</label>
          <div className="input-wrapper">
          <input className="input-field" type="text" name="apellido" onChange={handleChange}required/>
          </div>

          <label className="auth-label">Correo electrónico</label>
          <div className="input-wrapper">
          <input className="input-field" type="email" name="email" onChange={handleChange} required/>
          </div>

          <label className="auth-label">Contraseña</label>
          <div className="input-wrapper">
          <input className="input-field" type="password" name="password" onChange={handleChange} required minLength={6}/>
          </div>

        <GlobalButton type="submit" style={{ width: "40%" }}>Registrarse</GlobalButton>

        </form>

        <p style={{ marginTop: "10px", color: "red" }}>{msg}</p>

      </div>
    </div>
  );
}
