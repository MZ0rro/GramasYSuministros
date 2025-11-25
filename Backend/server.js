const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/Stock"); // 👈 NUEVA LÍNEA

const app = express();

app.use(cors());
app.use(express.json());

// Servir imágenes subidas
app.use("/uploads", express.static("uploads"));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/productos", productRoutes);
app.use("/api", stockRoutes); // 👈 NUEVA LÍNEA

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
