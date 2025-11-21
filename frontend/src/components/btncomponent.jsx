import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NavComponent() {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Si hay token → está logueado
    setIsLogged(!!token);

    // Leemos usuario y su rol (si existe)
    try {
      const raw = localStorage.getItem("usuario");
      const usuario = raw ? JSON.parse(raw) : null;
      setIsAdmin(usuario && Number(usuario.id_rol) === 1);
    } catch (e) {
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    // Mantengo el comportamiento original: si tienes una ruta /logout que maneja todo,
    // no la toco. Si prefieres que el logout sea local (limpiar localStorage y navegar),
    // dime y lo ajusto.
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("id_rol");
    setIsLogged(false);
    setIsAdmin(false);
    navigate("/"); // redirige al inicio después de limpiar
  };

  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link to="/contacto">Contacto</Link>

      {!isLogged ? (
        <>
          <Link to="/register">Registrarse</Link>
          <Link to="/login">Iniciar Sesión</Link>
        </>
      ) : (
        <>
          {isAdmin ? (
            <Link to="/dashboard">Panel</Link>
          ) : (
            <Link to="/dashboard">Mi Perfil</Link>
          )}

          <Link to="/logout" onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("usuario");
            localStorage.removeItem("id_rol");
          }}>
            Cerrar Sesion
          </Link>
        </>
      )}
    </nav>
  );
}
