import "../styles/ProductCard.css";

export default function ProductCard({ producto }) {
  return (
    <div className="product-card">

      <span className="product-badge">
        {producto.categoria}
      </span>

      <div className="product-image">
        <img
          src={`http://localhost:3001/uploads/img_products/${producto.imagen}`}
          alt={producto.nombre}
        />
      </div>

      <div className="card-content">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion}</p>
      </div>

      <div className="card-footer">
        <span className="price">
          ${new Intl.NumberFormat("es-CO").format(producto.precio)}
        </span>

        <button className="btn-add">
          VER MÁS
        </button>
      </div>

    </div>
  );
}
