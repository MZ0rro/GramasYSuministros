import { useEffect, useState } from "react";
import NavComponent from "../components/GlobalNav";
import "../styles/catalogo.css" ;
import GlobalButton from "../components/GlobalButton";

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

        // Catálogo entrega data como un array
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

      <NavComponent/>

      <main>
        {cargando ? (
          <h2  className="catalog-title">Cargando productos...</h2>
        ) : (
          <>
            <h2 className="catalog-title">Nuestros productos</h2>

        <div className="search-filter-container">

          <div className="search-box">
            <img src="http://localhost:3001/uploads/search.png" alt="buscar" />
            <input type="text" placeholder="Buscar productos..." onChange={(e) => setSearch(e.target.value)}/>
          </div>
          <button className="filter-btn">Filtrar por</button>
        </div>
            
        <div className="product-grid">
            {productosFiltrados.length > 0 ? (productosFiltrados.map((prod) => (

              <div key={prod.id_producto} className="product-card">

                <img src={`http://localhost:3001/uploads/${prod.imagen}`} alt={prod.nombre}/>

                <div className="card-content">

                  <h3>{prod.nombre}</h3>
                    <p>{prod.descripcion}</p>
                    <p className="price"> ${new Intl.NumberFormat("es-CO").format(prod.precio)}</p>

                </div>
                 <center><GlobalButton style={{ width: "70%", margin: "0px 0px 20px 0px" }}>Continuar</GlobalButton></center>
              </div>

            ))) : (
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