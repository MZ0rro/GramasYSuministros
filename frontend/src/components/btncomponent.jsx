import { Link } from "react-router-dom";

export default function NavComponent() {
  return (
    <nav style={{ display: "flex", gap: "1rem" }}>
      <Link to="/">Inicio</Link>
      <Link to="/contacto">Contacto</Link>
      <Link to="/registro">Registrarse</Link>
      <Link to="/iniciosesion">Iniciar Sesion</Link>
    </nav>
  );

  

  
}
