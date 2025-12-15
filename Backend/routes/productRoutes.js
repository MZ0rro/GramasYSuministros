const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET productos con categoría
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.id_producto,
        p.nombre,
        p.descripcion,
        p.precio,
        p.stock,
        p.imagen,
        p.id_categoria,
        c.nombre AS categoria
      FROM producto p
      LEFT JOIN categoria c 
        ON p.id_categoria = c.id_categoria
    `);

    res.json(rows);
  } catch (err) {
    console.error("Error cargando productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

module.exports = router;
