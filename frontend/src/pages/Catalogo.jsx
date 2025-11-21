import { useEffect, useState } from "react";
import "../styles/catalogo.css";

export default function Catalogo() {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("id_rol");

  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState("");

  if (!token) return <h2>No autorizado</h2>;
  if (rol !== "2") return <h2>No tienes permiso para ver esta página</h2>;

  // Cargar productos desde el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/productos");
        const data = await res.json();
        console.log("PRODUCTOS DEL BACKEND:", data);
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="catalog-container">

      <h1 className="catalog-title">Catálogo de productos</h1>

      {/* Searchbar */}
      <div className="search-filter-container">
        <div className="search-box">
          <img src="http://localhost:3001/uploads/search.png" alt="buscar" />
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="filter-btn">Filtrar por</button>
      </div>

      {/* Grid de productos */}
      <div className="product-grid">
        {productosFiltrados.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          productosFiltrados.map(prod => (
            <div key={prod.id_producto} className="product-card">

              <img 
                src={`http://localhost:3001/uploads/${prod.imagen}`} 
                alt={prod.nombre} 
                className="product-img"
              />

              <h3>{prod.nombre}</h3>

              <p><strong>Altura: </strong>{prod.altura}mm</p>
              <p><strong>Stock: </strong>{prod.stock}</p>
              <p><strong>Precio: </strong>{new Intl.NumberFormat("es-CO").format(prod.precio)}</p>

              <button className="info-btn">Más información</button>
            </div>
          ))
        )}
      </div>

      <h2 className="contact-title">¡Contáctanos mediante nuestras redes sociales!</h2>

      <div className="social-icons">
        <img src="/icons/instagram.png" alt="Instagram" />
        <img src="/icons/whatsapp.png" alt="WhatsApp" />
        <img src="/icons/facebook.png" alt="Facebook" />
      </div>

      <footer className="footer">
        Gramas y Suministros - 2025. Todos los derechos reservados.
      </footer>

    </div>
  );
}
