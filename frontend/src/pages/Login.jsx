import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginAndRegister.css";
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

    // GUARDAR TOKEN Y DATOS DEL USUARIO
    localStorage.setItem("token", data.token);
    localStorage.setItem("id_rol", data.user.id_rol);

    // 🔥 CLAVE para que funcione Dashboard
    localStorage.setItem("usuario", JSON.stringify(data.user));

    // REDIRECCIÓN SEGÚN ROL

    if (data.user.id_rol === 1) {
      navigate("/dashboard");   // Admin
    } else if (data.user.id_rol === 2) {
      navigate("/");    // Cliente
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="auth-container">

      <GlobalButton onClick={() => navigate("/")} style={{ width: "20%", position: "absolute", top: "30px", right: "40px" }}>Volver</GlobalButton>

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

        {/* Código admin (decorativo por ahora) */}
        <label className="auth-label">Código de verificación de Administrador</label>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            onChange={(e) => setAdminCode(e.target.value)}
          />
        </div>

        <GlobalButton onClick={handleLogin} style={{ width: "40%" }}>Continuar</GlobalButton>

        <GlobalButton onClick={() => navigate("/register")} style={{ width: "40%" }}>Registrarse</GlobalButton>

        <p style={{ marginTop: "10px", color: "red" }}>{msg}</p>
      </div>
    </div>
  );
}
