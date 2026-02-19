import { useEffect, useState } from "react";
import NavComponent from "../components/GlobalNav";
import ProductCard from "../components/ProductCard";
import "../styles/Catalogo.css";
import GlobalButton from "../components/GlobalButton";
import Footer from "../components/Footer";

export default function Index() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [search, setSearch] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState("Todas");

  const categorias = [
    "Todas",
    "Deportiva",
    "Residencial",
    "Comercial",
    "Decorativa",
    "Eventos",
    "Suministro",
    "Mascotas"
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
    categoriaActiva === "Todas" ||
    normalizar(p.categoria) === normalizar(categoriaActiva);

  return coincideBusqueda && coincideCategoria;
});



  return (

    <>

      <NavComponent />
      
      <div className="filtros-container">
        <div className="filtros-buttons">                    
          <div className="search-box">
            <img src="http://localhost:3001/uploads/icons/search.png" alt="buscar"/>
            <input type="text" placeholder="Buscar productos..." onChange={(e) => setSearch(e.target.value)}/>
          </div>

          {categorias.map((cat) => (
            <button key={cat} className={`filtro-btn ${ categoriaActiva === cat ? "active" : "" }`} onClick={() => setCategoriaActiva(cat)}> {cat}</button>
          ))}
        </div>
      </div>

      <div className="catalogo-container">
      
        {cargando ? (
          <div className="loading-container">
            <p>Cargando productos...</p>
          </div>
        ) : (
    
    <>

      <section className="productos-section">
        <h2>
          {categoriaActiva === "Todas"
            ? "Todos los Productos"
            : categoriaActiva}
          <span className="product-count">({productosFiltrados.length}) </span>
        </h2>

        <div className="productos-grid">
          {productosFiltrados.length > 0 ? ( productosFiltrados.map((prod) => (
            <ProductCard key={prod.id_producto} producto={prod} />
          ))

          ) : (
            <p className="no-products"> No hay productos disponibles </p>
          )}

        </div>
      </section>

      <br /><br />
    </>
  )}

        <Footer />

      </div>
    </>
  );
}
