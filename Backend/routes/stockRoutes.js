const express = require('express');
const db = require('../db');

const router = express.Router();

// Obtener todo el stock con información de productos
router.get('/', async (req, res) => {
    try {
        const [stock] = await db.query(`
      SELECT 
        s.*,
        p.nombre AS nombre_producto,
        c.nombre AS nombre_categoria
      FROM stock s
      LEFT JOIN productos p ON s.id_producto = p.id_producto
      LEFT JOIN categorias c ON p.id_categoria = c.id_categoria
    `);
        res.json(stock);
    } catch (error) {
        console.error('Error al obtener stock:', error);
        res.status(500).json({ message: 'Error al obtener stock' });
    }
});

// Obtener stock por ID de producto
router.get('/producto/:id', async (req, res) => {
    try {
        const [stock] = await db.query(`
      SELECT 
        s.*,
        p.nombre AS nombre_producto
      FROM stock s
      LEFT JOIN productos p ON s.id_producto = p.id_producto
      WHERE s.id_producto = ?
    `, [req.params.id]);

        if (stock.length === 0) {
            return res.status(404).json({ message: 'Stock no encontrado' });
        }
        res.json(stock[0]);
    } catch (error) {
        console.error('Error al obtener stock:', error);
        res.status(500).json({ message: 'Error al obtener stock' });
    }
});

module.exports = router;
