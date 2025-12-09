import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";
import GlobalButton from "../components/GlobalButton";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // 'error' o 'success'

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    setMsg(data.message);

    if (!res.ok) {
      setMsgType("error");
      return;
    }

    setMsgType("success");

    // Guardar token
    localStorage.setItem("token", data.token);

    // Guardar rol y nombre
    localStorage.setItem("id_rol", data.user.id_rol);
    localStorage.setItem("nombre", data.user.nombre);

    // Redirección según rol
    if (data.user.id_rol === 1) {
      navigate("/dashboard");   // admin
    } else if (data.user.id_rol === 2) {
      navigate("/");            // cliente (ahora va al Home)
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="auth-card">
        <h1 className="auth-title">Iniciar Sesión</h1>
        <h2 className="auth-subtitle">Bienvenido de nuevo</h2>

        {/* Correo */}
        <label className="auth-label">
          📧 Correo Electrónico
        </label>
        <div className="input-wrapper">
          <input
            type="email"
            className="input-field"
            placeholder="ejemplo@correo.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Contraseña */}
        <label className="auth-label">🔒 Contraseña</label>
        <div className="input-wrapper">
          <input
            type="password"
            className="input-field"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Código admin (opcional) */}
        <label className="auth-label">
          🔑 Código de Administrador <span>(opcional)</span>
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Código de verificación"
            onChange={(e) => setAdminCode(e.target.value)}
          />
        </div>

        <GlobalButton onClick={handleLogin}>
          🚀 Continuar
        </GlobalButton>

        {/* BOTÓN REGISTRARSE */}
        <GlobalButton
          className="register-button"
          onClick={() => navigate("/register")}
        >
          ✨ Crear Cuenta Nueva
        </GlobalButton>

        {msg && (
          <div className={`auth-message ${msgType}`}>
            {msgType === 'success' ? '✅ ' : '❌ '}
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
