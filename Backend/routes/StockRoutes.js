const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET - Obtener todo el stock
router.get("/stock", async (req, res) => {
  try {
    // 👇 Consulta SOLO la tabla stock, sin JOIN
    const query = `
      SELECT
        p.id_producto,
        p.nombre, 
        s.cantidad_actual, 
        s.nivel_minimo,
        s.ultima_actualizacion
        FROM producto p
        JOIN stock s ON p.id_producto = s.id_producto
    `;

    const [results] = await pool.query(query);

    console.log("✅ Stock obtenido:", results);

    res.status(200).json(results);
  } catch (error) {
    console.error("❌ Error en /api/stock:", error.message);
    res.status(500).json({ message: "Error al obtener el stock" });
  }
});

module.exports = router;