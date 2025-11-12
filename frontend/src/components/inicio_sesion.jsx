import { useState } from "react";
import "./Login.css"; // opcional, si tienes estilos separados

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMensaje("⚠️ Completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/usuario.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Guardar sesión en localStorage o contexto
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        window.location.href = "/dashboard"; // redirigir
      } else {
        setMensaje(data.message || "⚠️ Error al iniciar sesión.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("⚠️ Error de conexión con el servidor.");
    }
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src="/img/logo.png" alt="Logo de Gramas y Suministros" />
        </div>
        <nav>
          <a href="/">Inicio</a>
          <a href="/registro">Registrarse</a>
        </nav>
      </header>

      <main>
        <h2 style={{ textAlign: "center", color: "var(--verde)", marginBottom: 20 }}>
          Iniciar Sesión
        </h2>

        {mensaje && (
          <p style={{ color: "red", textAlign: "center" }}>{mensaje}</p>
        )}

        <form onSubmit={handleSubmit} className="formulario-login">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />

          <button type="submit" className="boton">
            Entrar
          </button>
        </form>
      </main>

      <footer>© 2025 Gramas y Suministros — Todos los derechos reservados.</footer>
    </div>
  );
}
