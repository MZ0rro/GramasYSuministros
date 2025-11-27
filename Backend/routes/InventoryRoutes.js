const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET - Obtener todos los productos del inventario
router.get("/inventario", async (req, res) => {
  try {
    const query = `
      SELECT
        p.id_producto,
        p.nombre,
        p.altura,
        p.peso,
        p.stock,
        p.precio,
        p.marca,
        p.material,
        p.descripcion,
        p.imagen,
        c.nombre as categoria
      FROM producto p
      LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
      ORDER BY p.id_producto
    `;

    const [results] = await pool.query(query);

    console.log("✅ Inventario obtenido:", results);

    res.status(200).json(results);
  } catch (error) {
    console.error("❌ Error en /api/inventario:", error.message);
    res.status(500).json({ message: "Error al obtener el inventario" });
  }
});

module.exports = router;