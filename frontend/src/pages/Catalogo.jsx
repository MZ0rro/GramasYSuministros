import { useEffect, useState } from "react";
import NavComponent from "../components/GlobalNav";
import "../styles/Catalogo.css";
import GlobalButton from "../components/GlobalButton";

export default function Index() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [search, setSearch] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("TODAS");

  const categorias = [
    "TODAS",
    "GRAMA SINTÉTICA",
    "GRAMA NATURAL",
    "ABONOS",
    "HERRAMIENTAS",
    "ACCESORIOS"
  ];

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        let data = [];

        try {
          const res = await fetch("http://localhost:3001/api/productos");

          if (res.ok) {
            data = await res.json();
          }
        } catch (err) {
          console.error("Error al obtener productos:", err);
        }

        setProductos(data);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

const normalizar = (texto = "") =>
  texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/_/g, " ")
    .toUpperCase();

const productosFiltrados = productos.filter((p) => {
  const coincideBusqueda = p.nombre
    .toLowerCase()
    .includes(search.toLowerCase());

  const coincideCategoria =
    categoriaActiva === "TODAS" ||
    normalizar(p.categoria) === normalizar(categoriaActiva);

  return coincideBusqueda && coincideCategoria;
});





  return (
    <div className="app">
      <NavComponent />

      <main>
        {cargando ? (
          <h2 className="catalog-title">Cargando productos...</h2>
        ) : (
          <>
            <h2 className="catalog-title"> {categoriaActiva === "TODAS" ? "Todos los Productos" : categoriaActiva}{" "} <span>({productosFiltrados.length})</span> </h2>

            <div className="category-tabs">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  className={`category-btn ${
                    categoriaActiva === cat ? "active" : ""
                  }`}
                  onClick={() => setCategoriaActiva(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="search-filter-container">
              <div className="search-box">
                <img src="http://localhost:3001/uploads/icons/search.png" alt="buscar" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="filter-btn">Filtrar por</button>
            </div>

            <div className="product-grid">
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((prod) => (
                  <div key={prod.id_producto} className="product-card">
                    <img
                      src={`http://localhost:3001/uploads/${prod.imagen}`}
                      alt={prod.nombre}
                    />
                    <div className="card-content">
                      <h3>{prod.nombre}</h3>
                      <p>{prod.descripcion}</p>
                      <p className="price">
                        $
                        {new Intl.NumberFormat("es-CO").format(prod.precio)}
                      </p>
                    </div>
                    <center>
                      <GlobalButton
                        style={{ width: "70%", margin: "0px 0px 20px 0px" }}
                      >
                        Agregar al Carrito
                      </GlobalButton>
                    </center>
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
