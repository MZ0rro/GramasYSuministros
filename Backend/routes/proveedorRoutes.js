const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET - Obtener todos los proveedores
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(`
      SELECT 
        id_proveedor,
        nombre,
        contacto,
        telefono,
        email,
        direccion
      FROM proveedor
      ORDER BY nombre
    `);

        res.json(rows);
    } catch (err) {
        console.error("Error cargando proveedores:", err);
        res.status(500).json({ error: "Error al obtener proveedores" });
    }
});

module.exports = router;
