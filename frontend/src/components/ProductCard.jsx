// Componente ProductCard - Tarjeta para mostrar productos en el catálogo
// Muestra imagen, nombre, precio, stock y botón de acción

import '../styles/components.css'; // Importa estilos compartidos

// Props que recibe:
// - producto: objeto con datos del producto (nombre, precio, imagen, stock, etc.)
// - onAddToCart: función que se ejecuta al agregar al carrito (opcional)
export default function ProductCard({ producto, onAddToCart }) {
    // Desestructuración del objeto producto para acceder fácilmente a sus propiedades
    const {
        id_producto,      // ID único del producto
        nombre,           // Nombre del producto
        marca,            // Marca del producto
        precio,           // Precio unitario
        stock,            // Cantidad disponible
        imagen,           // URL de la imagen
        descripcion       // Descripción del producto
    } = producto;

    // Función para formatear el precio en pesos colombianos
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',    // Formato de moneda
            currency: 'COP',      // Pesos colombianos
            minimumFractionDigits: 0  // Sin decimales
        }).format(price);
    };

    return (
        // Contenedor principal de la tarjeta de producto
        <div className="product-card">
            {/* Contenedor de la imagen del producto */}
            <div className="product-image-container">
                <img
                    src={imagen || '/placeholder-product.png'}  // Usa placeholder si no hay imagen
                    alt={nombre}  // Texto alternativo para accesibilidad
                    className="product-image"
                    onError={(e) => {  // Si la imagen falla al cargar
                        e.target.src = '/placeholder-product.png';  // Muestra imagen por defecto
                    }}
                />

                {/* Badge de stock bajo si quedan menos de 10 unidades */}
                {stock < 10 && stock > 0 && (
                    <span className="stock-badge low">¡Pocas unidades!</span>
                )}

                {/* Badge de sin stock si no hay unidades */}
                {stock === 0 && (
                    <span className="stock-badge out">Agotado</span>
                )}
            </div>

            {/* Contenedor de la información del producto */}
            <div className="product-info">
                {/* Marca del producto (si existe) */}
                {marca && <p className="product-brand">{marca}</p>}

                {/* Nombre del producto */}
                <h3 className="product-name">{nombre}</h3>

                {/* Descripción corta (máximo 100 caracteres) */}
                {descripcion && (
                    <p className="product-description">
                        {descripcion.length > 100
                            ? descripcion.substring(0, 100) + '...'  // Trunca si es muy largo
                            : descripcion
                        }
                    </p>
                )}

                {/* Contenedor del precio y stock */}
                <div className="product-footer">
                    {/* Precio formateado */}
                    <p className="product-price">{formatPrice(precio)}</p>

                    {/* Stock disponible */}
                    <p className="product-stock">
                        Stock: <span className={stock > 0 ? 'in-stock' : 'out-stock'}>
                            {stock}
                        </span>
                    </p>
                </div>

                {/* Botón de agregar al carrito (solo si hay stock) */}
                {stock > 0 && onAddToCart && (
                    <button
                        className="btn-add-cart"
                        onClick={() => onAddToCart(producto)}  // Ejecuta función con el producto
                    >
                        Agregar al carrito
                    </button>
                )}

                {/* Mensaje si no hay stock */}
                {stock === 0 && (
                    <button className="btn-add-cart disabled" disabled>
                        No disponible
                    </button>
                )}
            </div>
        </div>
    );
}
