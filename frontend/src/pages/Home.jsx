// Home.jsx - Página principal con búsqueda, categorías, más productos y gestión de sesión
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

// Productos de ejemplo ampliados con imágenes
const productosEjemplo = [
    // Categoría: Grama Sintética
    { id_producto: 1, nombre: 'Grama Sintética Premium 30mm', categoria: 'Grama Sintética', descripcion: 'Ideal para jardines residenciales, suave al tacto.', precio: 45000, imagen: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 7, nombre: 'Grama Sintética Deportiva 50mm', categoria: 'Grama Sintética', descripcion: 'Alta resistencia para canchas de fútbol.', precio: 65000, imagen: 'https://images.unsplash.com/photo-1533460004989-acf88a8bc499?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 8, nombre: 'Grama Sintética Decorativa 10mm', categoria: 'Grama Sintética', descripcion: 'Económica, para eventos y ferias.', precio: 22000, imagen: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 9, nombre: 'Grama Sintética Pet Friendly', categoria: 'Grama Sintética', descripcion: 'Con drenaje especial para mascotas.', precio: 55000, imagen: 'https://images.unsplash.com/photo-1622383563227-044011358d20?auto=format&fit=crop&w=300&q=80' },

    // Categoría: Grama Natural
    { id_producto: 2, nombre: 'Grama Natural Bermuda', categoria: 'Grama Natural', descripcion: 'Resistente al tráfico y sequía.', precio: 25000, imagen: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 10, nombre: 'Grama Natural San Agustín', categoria: 'Grama Natural', descripcion: 'Ideal para zonas con sombra parcial.', precio: 28000, imagen: 'https://images.unsplash.com/photo-1576043005963-f4b2a8d1195d?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 11, nombre: 'Grama Natural Zoysia', categoria: 'Grama Natural', descripcion: 'Textura fina y crecimiento lento.', precio: 30000, imagen: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=300&q=80' },

    // Categoría: Abonos y Fertilizantes
    { id_producto: 3, nombre: 'Abono Orgánico 10kg', categoria: 'Abonos', descripcion: '100% natural, mejora el suelo.', precio: 35000, imagen: 'https://images.unsplash.com/photo-1622383563227-044011358d20?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 6, nombre: 'Fertilizante Premium 5kg', categoria: 'Abonos', descripcion: 'NPK 15-15-15 para crecimiento rápido.', precio: 28000, imagen: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 12, nombre: 'Humus de Lombriz 5kg', categoria: 'Abonos', descripcion: 'Mejorador de suelo de alta calidad.', precio: 18000, imagen: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 13, nombre: 'Urea Agrícola 1kg', categoria: 'Abonos', descripcion: 'Alto contenido de nitrógeno.', precio: 12000, imagen: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&w=300&q=80' },

    // Categoría: Herramientas
    { id_producto: 4, nombre: 'Cortadora de Césped Eléctrica', categoria: 'Herramientas', descripcion: 'Potente motor de 1200W.', precio: 450000, imagen: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 14, nombre: 'Tijeras de Podar', categoria: 'Herramientas', descripcion: 'Acero inoxidable, corte preciso.', precio: 45000, imagen: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 15, nombre: 'Rastrillo Metálico', categoria: 'Herramientas', descripcion: 'Para limpieza de hojas y residuos.', precio: 25000, imagen: 'https://images.unsplash.com/photo-1589589149480-dc2779277571?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 16, nombre: 'Manguera de Riego 20m', categoria: 'Herramientas', descripcion: 'Reforzada, no se dobla.', precio: 60000, imagen: 'https://images.unsplash.com/photo-1527538079466-fa795a86d638?auto=format&fit=crop&w=300&q=80' },

    // Categoría: Riego
    { id_producto: 5, nombre: 'Sistema de Riego Automático', categoria: 'Riego', descripcion: 'Programable por días y horas.', precio: 320000, imagen: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 17, nombre: 'Aspersor Giratorio', categoria: 'Riego', descripcion: 'Cubre hasta 10 metros de radio.', precio: 35000, imagen: 'https://images.unsplash.com/photo-1527538079466-fa795a86d638?auto=format&fit=crop&w=300&q=80' },
    { id_producto: 18, nombre: 'Goteros Ajustables (Pack x10)', categoria: 'Riego', descripcion: 'Para riego localizado eficiente.', precio: 15000, imagen: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?auto=format&fit=crop&w=300&q=80' },
];

export default function Home() {
    const navigate = useNavigate();
    const [productos, setProductos] = useState(productosEjemplo);
    const [loading, setLoading] = useState(true);
    const [carrito, setCarrito] = useState([]);

    // Estados de sesión
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    // Estados para filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');

    // Obtener categorías únicas
    const categorias = ['Todas', ...new Set(productosEjemplo.map(p => p.categoria))];

    useEffect(() => {
        // Verificar sesión
        const token = localStorage.getItem('token');
        const nombre = localStorage.getItem('nombre');
        if (token) {
            setIsLoggedIn(true);
            if (nombre) setUserName(nombre);
        }

        // Intentar cargar productos del backend (manteniendo la lógica de fallback)
        fetch('http://localhost:3001/api/productos')
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Si el backend tuviera categorías, usaríamos esos datos
                }
                setLoading(false);
            })
            .catch(err => {
                console.log('Usando productos de ejemplo');
                setLoading(false);
            });

        const carritoGuardado = localStorage.getItem('carrito');
        if (carritoGuardado) {
            try {
                setCarrito(JSON.parse(carritoGuardado));
            } catch (e) { console.error(e); }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id_rol');
        localStorage.removeItem('nombre');
        setIsLoggedIn(false);
        setUserName('');
        navigate('/');
    };

    const handleAddToCart = (producto) => {
        if (!isLoggedIn) {
            alert('⚠️ Debes iniciar sesión primero para agregar productos al carrito');
            navigate('/login');
            return;
        }

        const nuevoCarrito = [...carrito];
        const existente = nuevoCarrito.find(item => item.id_producto === producto.id_producto);
        if (existente) {
            existente.cantidad += 1;
        } else {
            nuevoCarrito.push({ ...producto, cantidad: 1 });
        }
        setCarrito(nuevoCarrito);
        localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
        alert('✅ ' + producto.nombre + ' agregado al carrito');
    };

    // Filtrado de productos
    const filteredProducts = productos.filter(producto => {
        const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todas' || producto.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="home-container">
            {/* Header */}
            <header className="home-header">
                <div className="header-content">
                    <div className="logo-section">
                        <h1>Gramas y Suministros</h1>
                        <p>Synthetic Grass</p>
                    </div>

                    {/* Barra de búsqueda */}
                    <div className="search-bar-header">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="search-icon">🔍</span>
                    </div>

                    <div className="header-actions">
                        <div className="cart-indicator">
                            🛒
                            {carrito.length > 0 && (
                                <span className="cart-count">{carrito.length}</span>
                            )}
                        </div>

                        {/* Botón Quiénes Somos */}
                        <button onClick={() => navigate('/quienes-somos')} className="btn-about-header">
                            Quiénes Somos
                        </button>

                        {/* Botones de acción / Sesión */}
                        <div className="auth-buttons">
                            {isLoggedIn ? (
                                <>
                                    <span className="user-greeting">Hola, {userName}</span>
                                    <button onClick={handleLogout} className="btn-logout-header">
                                        Cerrar Sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => navigate('/register')} className="btn-register-header">
                                        Registrarse
                                    </button>
                                    <button onClick={() => navigate('/login')} className="btn-login">
                                        Iniciar Sesión
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Sección de Categorías */}
            <div className="categories-bar">
                <div className="categories-container">
                    {categorias.map(cat => (
                        <button
                            key={cat}
                            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Productos */}
            <main className="productos-section">
                <h2 className="section-title">
                    {selectedCategory === 'Todas' ? 'Todos los Productos' : selectedCategory}
                    <span className="product-count"> ({filteredProducts.length})</span>
                </h2>

                {loading && <p className="loading-text">Cargando productos...</p>}

                {!loading && (
                    <div className="productos-grid">
                        {filteredProducts.length === 0 ? (
                            <p className="no-products">No se encontraron productos que coincidan con tu búsqueda.</p>
                        ) : (
                            filteredProducts.map(producto => (
                                <div key={producto.id_producto} className="product-card-home">
                                    <div className="product-image">
                                        {producto.imagen ? (
                                            <img src={producto.imagen} alt={producto.nombre} />
                                        ) : (
                                            <div className="placeholder-image">📦</div>
                                        )}
                                        <span className="category-tag">{producto.categoria}</span>
                                    </div>
                                    <div className="product-info-home">
                                        <h3 className="product-name-home">{producto.nombre}</h3>
                                        <p className="product-description-home">
                                            {producto.descripcion}
                                        </p>
                                        <div className="product-footer-home">
                                            <p className="product-price-home">
                                                ${Number(producto.precio).toLocaleString('es-CO')}
                                            </p>
                                            <button
                                                className="btn-add-to-cart-home"
                                                onClick={() => handleAddToCart(producto)}
                                            >
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </main>

            <footer className="home-footer">
                <p>© 2024 Gramas y Suministros - Todos los derechos reservados</p>
                <div className="footer-links">
                    <button onClick={() => navigate('/contacto')}>Contacto</button>
                </div>
            </footer>
        </div>
    );
}
