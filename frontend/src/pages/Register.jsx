import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
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
  const [msgType, setMsgType] = useState(""); // 'error' o 'success'

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    setMsg(data.message);

    if (res.ok) {
      setMsgType("success");
      // Redirigir al login después de registro exitoso
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setMsgType("error");
    }
  };

  return (
    <div className="auth-container">

      <button className="back-button" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="auth-card">

        <h1 className="auth-title">Crear Cuenta</h1>
        <h2 className="auth-subtitle">Registro de Usuario</h2>

        <form onSubmit={handleSubmit}>

          <label className="auth-label">👤 Nombre</label>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="text"
              name="nombre"
              placeholder="Ingresa tu nombre"
              onChange={handleChange}
              required
            />
          </div>

          <label className="auth-label">👥 Apellido</label>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="text"
              name="apellido"
              placeholder="Ingresa tu apellido"
              onChange={handleChange}
              required
            />
          </div>

          <label className="auth-label">📧 Correo Electrónico</label>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="ejemplo@correo.com"
              onChange={handleChange}
              required
            />
          </div>

          <label className="auth-label">🔒 Contraseña <span>(mínimo 6 caracteres)</span></label>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          <GlobalButton type="submit">
            ✨ Registrarse
          </GlobalButton>

        </form>

        {msg && (
          <div className={`auth-message ${msgType}`}>
            {msgType === 'success' ? '✅ ' : '❌ '}
            {msg}
          </div>
        )}

        <p style={{ marginTop: "25px", color: "#558b2f", fontSize: "0.95rem", fontWeight: "600" }}>
          ¿Ya tienes cuenta?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{
              color: "#2e7d32",
              cursor: "pointer",
              textDecoration: "underline",
              fontWeight: "800"
            }}
          >
            Inicia sesión aquí
          </span>
        </p>

      </div>
    </div>
  );
}
