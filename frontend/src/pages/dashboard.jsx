import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../estilos/global.css";
import logo from "../assets/logo.png";

export default function Dashboard() {
  const navigate = useNavigate();

  // Obtener usuario desde localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuario) {
      // Si no hay usuario, redirigir al login
      navigate("/inicio_sesion");
      return;
    }

    // Si el usuario es administrador, redirigir al panel admin
    if (usuario.rol === 1) {
      navigate("/panel_administrador");
    }
  }, [usuario, navigate]);

  if (!usuario) return null; // Evitar render antes de redirigir

  return (
    <div className="dashboard">
      <header>
        <div className="logo">
          <img src={logo} alt="Logo de Gramas y Suministros" />
          <h1>Panel Interno</h1>
        </div>
        <nav>
          <Link to="/">Catálogo</Link>
          <Link to="/logout">Cerrar sesión</Link>
        </nav>
      </header>

      <main>
        <h2>Bienvenido, {usuario.nombre}</h2>
        <p>Rol: {usuario.rol === 1 ? "Administrador" : "Cliente"}</p>

        <ul>
          <li>Ver mis pedidos</li>
          <li>Consultar cotizaciones</li>
        </ul>

        {usuario.rol === 1 && (
          <Link to="/panel_administrador" className="btn-panel-admin">
            Ir al Panel de Administrador
          </Link>
        )}
      </main>

      <footer>
        © 2025 Gramas y Suministros — Todos los derechos reservados.
      </footer>
    </div>
  );
}
