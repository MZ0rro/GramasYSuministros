import { useEffect, useState } from "react";
import NavComponent from "../components/btncomponent";
import "../styles/catalogo.css" ;

export default function Index() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/productos");
        const data = await res.json();

        console.log("PRODUCTOS INDEX:", data);

        // ⭐ Catálogo entrega data como un array, entonces aquí igual
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <div className="logo">
          <h1>Gramas y Suministros</h1>
        </div>
      <NavComponent/>

      </header>

      <main>
        {cargando ? (
          <h2 style={{ color: "var(--verde)" }}>Cargando productos...</h2>
        ) : (
          <>
            <h2 style={{ color: "var(--verde)" }}>Nuestros productos</h2>

            {/* Buscador igual que catálogo */}
            <div className="search-box" style={{ margin: "20px auto" }}>
              <input
                type="text"
                placeholder="Buscar productos..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="productos" style={{ marginTop: "40px" }}>
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((prod) => (
                  <div className="card" key={prod.id_producto}>
                    {/* ⭐ Igual que catálogo → cargado desde /uploads */}
                    <img
                      src={`http://localhost:3001/uploads/${prod.imagen}`}
                      alt={prod.nombre}
                    />

                    <div className="card-content">
                      <h3>{prod.nombre}</h3>
                      <p>{prod.descripcion}</p>
                      <p className="precio">
                        ${new Intl.NumberFormat("es-CO").format(prod.precio)}
                      </p>
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
