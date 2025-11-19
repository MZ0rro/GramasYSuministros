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

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    setMsg(data.message);

    if (!res.ok) return;

    // Guardar token
    localStorage.setItem("token", data.token);

    // Guardar rol
    localStorage.setItem("id_rol", data.user.id_rol);

    // Redirección según rol
    if (data.user.id_rol === 1) {
      navigate("/dashboard");   // admin
    } else if (data.user.id_rol === 2) {
      navigate("/catalogo");    // cliente
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Volver
      </button>

      <div className="auth-card">
        <h1 className="auth-title">Iniciar sesión</h1>
        <h2 className="auth-subtitle">Administrador</h2>

        {/* Correo */}
        <label className="auth-label">
          Dirección de correo <span>(Solo se permite correo electrónico)</span>
        </label>
        <div className="input-wrapper">
          <img src="/icons/mail.png" alt="correo" />
          <input
            type="email"
            className="input-field"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Contraseña */}
        <label className="auth-label">Contraseña</label>
        <div className="input-wrapper">
          <img src="/icons/lock.png" alt="password" />
          <input
            type="password"
            className="input-field"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Código admin (NO afecta el login por ahora) */}
        <label className="auth-label">Código de verificación de Administrador</label>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            onChange={(e) => setAdminCode(e.target.value)}
          />
        </div>

        <GlobalButton onClick={handleLogin}>Continuar</GlobalButton>

        {/* BOTÓN REGISTRARSE */}
        <GlobalButton
          className="register-button"
          onClick={() => navigate("/register")}
        >
          Registrarse
        </GlobalButton>

        <p style={{ marginTop: "10px", color: "red" }}>{msg}</p>
      </div>
    </div>
  );
}
