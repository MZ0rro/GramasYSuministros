import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavComponent from "../components/GlobalNav";
import GlobalButton from "../components/GlobalButton";

export default function Dashboard() {
  const navigate = useNavigate();

  // Cargar usuario desde localStorage

  const rawUsuario = localStorage.getItem("usuario");
  let usuario = null;

  try {
    usuario = rawUsuario ? JSON.parse(rawUsuario) : null;
  } catch (err) {
    usuario = null;
  }

  // Si no está logueado:

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  if (!usuario) return null;

  const isAdmin = usuario.id_rol === 1;

  return (
    <div className="dashboard">

      <NavComponent />

      <main>
        <h2>Bienvenido, {usuario.nombre}</h2>
        <p>Rol: {isAdmin ? "Administrador" : "Cliente"}</p>

        {/* =====================================================
                    USUARIO NORMAL
        ====================================================== */}
        {!isAdmin && (
          <div className="usuario-normal-area">
            <h3 className="subtitulo">Tus opciones</h3>

            <div className="user-options">

              <GlobalButton onClick={() => navigate("/")} style={{ width: "100%" }}>Mis pedidos</GlobalButton> <br /><br />

              <GlobalButton onClick={() => navigate("/")} style={{ width: "100%" }}>Editar perfil</GlobalButton> <br /><br />

              <GlobalButton onClick={() => navigate("/")} style={{ width: "100%" }}>Mis cotizaciones</GlobalButton> <br /><br />
            </div>
          </div>
        )}

        {/* =====================================================
                     ADMINISTRADOR
        ====================================================== */}
        {isAdmin && (
          <div className="panel-admin">
            <h2 className="title-admin">Panel de administración</h2>
            <p className="question">¿Qué desea hacer?</p>

            <div className="options">

              <Link to="/admin/usuarios" className="card link-card">
                <div className="icon-user"></div>
                <h3>Control de usuarios</h3>
              </Link>

              <Link to="/Inventario" className="card link-card">
                <div className="icon-inventory"></div>
                <h3>Administrar inventarios</h3>
              </Link>

              {/* --------- COTIZACIONES --------- */}
              <Link to="/admin/cotizaciones" className="card link-card">
                <div className="icon-quote"></div>
                <h3>Generar cotizaciones</h3>
              </Link>

              <Link to="/reportes" className="card link-card">
                Ir a reportes
              </Link>

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