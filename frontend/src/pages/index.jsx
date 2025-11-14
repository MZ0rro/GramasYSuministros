import { useEffect, useState } from "react";
import "../estilos/global.css";
import logo from "../assets/logo.png";
import NavComponent from "../components/btncomponent";

export default function Index() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProductos(data.data);
        }
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setCargando(false);
      });
  }, []);

  return (
    <div>
      <header>
        <div className="logo">
          <img src={logo} alt="Logo de Gramas y Suministros" />
          <h1>Gramas y Suministros</h1>
        </div>
        <NavComponent />
      </header>

      <main>
        {cargando ? (
          <h2 style={{ color: "var(--verde)" }}>Cargando productos...</h2>
        ) : (
          <>
            <h2 style={{ color: "var(--verde)" }}>Nuestros productos</h2>
            <div className="productos" style={{ marginTop: "40px" }}>
              {productos.length > 0 ? (
                productos.map((prod) => (
                  <div className="card" key={prod.id_producto}>
                    <img
                      src={`http://localhost/gramasysuministros/frontend/assets/${prod.imagen}`}
                      alt={prod.nombre}
                    />
                    <div className="card-content">
                      <h3>{prod.nombre}</h3>
                      <p>{prod.descripcion}</p>
                      <p className="precio">${prod.precio}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay productos disponibles.</p>
              )}
            </div>
          </>
        )}
      </main>

      <footer>
        © {new Date().getFullYear()} Gramas y Suministros — Todos los derechos reservados.
      </footer>
    </div>
  );
}