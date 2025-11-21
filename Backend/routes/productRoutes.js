const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET productos
router.get('/productos', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM producto');
    res.json(rows);
  } catch (err) {
    console.error("Error cargando productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

module.exports = router;
