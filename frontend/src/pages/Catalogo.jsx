// Catálogo de Productos - Página para clientes
// Muestra todos los productos disponibles con imágenes, precios y opción de agregar al carrito

import { useState, useEffect } from 'react'; // Hooks de React
import { useNavigate } from 'react-router-dom'; // Para navegación
import ProductCard from '../components/ProductCard'; // Componente de tarjeta de producto
import '../styles/catalogo.css'; // Estilos del catálogo

export default function Catalogo() {
  // Hook de navegación
  const navigate = useNavigate();

  // Obtiene token y rol del localStorage
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("id_rol");

  // Estados del componente
  const [productos, setProductos] = useState([]); // Array de productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas'); // Filtro de categoría
  const [carrito, setCarrito] = useState([]); // Carrito de compras

  // useEffect para cargar productos al montar el componente
  useEffect(() => {
    // Función asíncrona para obtener productos del backend
    const fetchProductos = async () => {
      try {
        // Petición GET a la API de productos
        const response = await fetch('http://localhost:3001/api/productos');

        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }

        // Convierte la respuesta a JSON
        const data = await response.json();

        // Actualiza el estado con los productos
        setProductos(data);

        // Desactiva el estado de carga
        setLoading(false);
      } catch (err) {
        // Maneja errores
        console.error('Error:', err);
        setError('No se pudieron cargar los productos');
        setLoading(false);
      }
    };

    // Ejecuta la función
    fetchProductos();
  }, []); // Array vacío = solo se ejecuta una vez

  // Función para agregar producto al carrito
  const handleAddToCart = (producto) => {
    // Agrega el producto al array del carrito
    setCarrito([...carrito, producto]);

    // Muestra alerta de confirmación
    alert(`${producto.nombre} agregado al carrito`);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Elimina datos del localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('id_rol');
    // Redirige al login
    navigate('/login');
  };

  // Filtra productos según la categoría seleccionada
  const productosFiltrados = categoriaFiltro === 'todas'
    ? productos // Si es 'todas', muestra todos
    : productos.filter(p => p.id_categoria === parseInt(categoriaFiltro)); // Filtra por categoría

  // Validación de autenticación
  if (!token) {
    return (
      <div className="catalogo-container">
        <h2>No autorizado - Por favor inicia sesión</h2>
      </div>
    );
  }

  // Validación de rol (solo clientes)
  if (rol !== "2") {
    return (
      <div className="catalogo-container">
        <h2>No tienes permiso para ver esta página</h2>
        <p>Esta sección es solo para clientes</p>
      </div>
    );
  }

  return (
    // Contenedor principal del catálogo
    <div className="catalogo-container">
      {/* Header del catálogo */}
      <header className="catalogo-header">
        {/* Logo y título */}
        <div className="catalogo-logo">
          <div className="logo-circle"></div>
          <div>
            <h1>Gramas y Suministros</h1>
            <p>Catálogo de Productos</p>
          </div>
        </div>

        {/* Contador de carrito y botón de logout */}
        <div className="header-actions">
          {/* Indicador de carrito */}
          <div className="cart-indicator">
            🛒 <span className="cart-count">{carrito.length}</span>
          </div>

          {/* Botón de cerrar sesión */}
          <button className="btn-logout" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Barra de filtros */}
      <div className="filtros-container">
        <h3>Filtrar por categoría:</h3>

        {/* Botones de filtro */}
        <div className="filtros-buttons">
          {/* Botón para mostrar todas las categorías */}
          <button
            className={categoriaFiltro === 'todas' ? 'filtro-btn active' : 'filtro-btn'}
            onClick={() => setCategoriaFiltro('todas')}
          >
            Todas
          </button>

          {/* Botón para Grama natural (categoría 1) */}
          <button
            className={categoriaFiltro === '1' ? 'filtro-btn active' : 'filtro-btn'}
            onClick={() => setCategoriaFiltro('1')}
          >
            Grama Natural
          </button>

          {/* Botón para Grama sintética (categoría 2) */}
          <button
            className={categoriaFiltro === '2' ? 'filtro-btn active' : 'filtro-btn'}
            onClick={() => setCategoriaFiltro('2')}
          >
            Grama Sintética
          </button>

          {/* Botón para Abonos (categoría 3) */}
          <button
            className={categoriaFiltro === '3' ? 'filtro-btn active' : 'filtro-btn'}
            onClick={() => setCategoriaFiltro('3')}
          >
            Abonos
          </button>

          {/* Botón para Herramientas (categoría 4) */}
          <button
            className={categoriaFiltro === '4' ? 'filtro-btn active' : 'filtro-btn'}
            onClick={() => setCategoriaFiltro('4')}
          >
            Herramientas
          </button>
        </div>
      </div>

      {/* Sección de productos */}
      <div className="productos-section">
        {/* Título con contador de productos */}
        <h2 className="section-title">
          Productos Disponibles
          <span className="product-count">({productosFiltrados.length})</span>
        </h2>

        {/* Muestra loading mientras carga */}
        {loading && (
          <div className="loading-container">
            <p className="loading-text">Cargando productos...</p>
          </div>
        )}

        {/* Muestra error si hay */}
        {error && (
          <div className="error-container">
            <p className="error-text">{error}</p>
          </div>
        )}

        {/* Grid de productos */}
        {!loading && !error && (
          <div className="productos-grid">
            {/* Mapea cada producto a un ProductCard */}
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map((producto) => (
                <ProductCard
                  key={producto.id_producto} // Key única para React
                  producto={producto} // Pasa el producto completo
                  onAddToCart={handleAddToCart} // Función para agregar al carrito
                />
              ))
            ) : (
              // Mensaje si no hay productos en la categoría
              <p className="no-products">
                No hay productos disponibles en esta categoría
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer del catálogo */}
      <footer className="catalogo-footer">
        <p>© 2024 Gramas y Suministros - Synthetic Grass</p>
        <p>Todos los derechos reservados</p>
      </footer>
    </div>
  );
}