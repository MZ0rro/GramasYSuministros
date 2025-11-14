import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from './routes/productos.js';
import stockRoutes from './routes/stock.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configurar CORS para permitir el frontend
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8080'],
    credentials: true
}));

app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        status: "OK",
        message: "Backend funcionando correctamente ✔️",
        version: "1.0.0",
        server: "Node.js + Express",
        port: PORT,
        endpoints: {
            productos: "/api/productos",
            stock: "/api/stock"
        },
        time: new Date().toLocaleString()
    });
});

// Registrar rutas
app.use('/api/productos', productosRoutes);
app.use('/api/stock', stockRoutes);

// Manejo de rutas no encontradas - CORREGIDO
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor Node corriendo en http://localhost:${PORT}`);
    console.log('📊 Endpoints disponibles:');
    console.log('   • GET  /');
    console.log('   • GET  /api/productos');
    console.log('   • POST /api/productos');
    console.log('   • GET  /api/stock');
});