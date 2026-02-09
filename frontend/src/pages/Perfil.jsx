import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavComponent from "../components/GlobalNav";
import "../styles/Perfil.css";

export default function Dashboard() {
  const navigate = useNavigate();

  // ===== USUARIO DESDE LOCALSTORAGE =====
  const rawUsuario = localStorage.getItem("usuario");
  let usuario = null;

  try {
    usuario = rawUsuario ? JSON.parse(rawUsuario) : null;
  } catch {
    usuario = null;
  }

  // ===== PROTECCIÓN DE LOGIN =====
  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  // ===== REDIRECCIÓN SI ES ADMIN =====
  useEffect(() => {
    if (usuario?.id_rol === 1) {
      navigate("/panel"); // o /panel-admin
    }
  }, [usuario, navigate]);

  if (!usuario) return null;

  const isAdmin = usuario.id_rol === 1;

  return (
    <div className="dashboard">
      <NavComponent />

      <main>
        <div className="profile-welcome glass-effect">
          <h2>Bienvenido, {usuario.nombre}</h2>
          <p>Cuenta de Cliente</p>
        </div>

        {/* PERFIL USUARIO NORMAL */}
        {!isAdmin && (
          <div className="options-grid">
            <div
              className="link-card glass-effect"
              onClick={() => navigate("/mis-pedidos")}
            >
              <div className="icon-box">📦</div>
              <h3>Mis pedidos</h3>
            </div>

            <div
              className="link-card glass-effect"
              onClick={() => navigate("/editar-perfil")}
            >
              <div className="icon-box">👤</div>
              <h3>Editar perfil</h3>
            </div>

            <div
              className="link-card glass-effect"
              onClick={() => navigate("/mis-cotizaciones")}
            >
              <div className="icon-box">📝</div>
              <h3>Mis cotizaciones</h3>
            </div>
          </div>
        )}
      </main>

      <footer>
        © 2025 Gramas y Suministros — Todos los derechos reservados.
      </footer>
    </div>
  );
}
