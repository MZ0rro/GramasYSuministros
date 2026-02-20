const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const productRoutes = require('./routes/productRoutes');
const InventoryRoutes = require("./routes/InventoryRoutes");
const stockRoutes = require("./routes/StockRoutes");
const entryRoutes = require('./routes/entryRoutes');
const proveedorRoutes = require('./routes/proveedorRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Servir imágenes subidas
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/productos', productRoutes);
app.use("/api", InventoryRoutes);
app.use("/api", stockRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/usuarios', userRoutes);


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
