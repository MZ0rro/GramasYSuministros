const express = require('express');
const db = require('../db');

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const [productos] = await db.query('SELECT * FROM productos');
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ message: 'Error al obtener productos' });
    }
});

// Obtener producto por ID
router.get('/:id', async (req, res) => {
    try {
        const [producto] = await db.query('SELECT * FROM productos WHERE id_producto = ?', [req.params.id]);
        if (producto.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto[0]);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ message: 'Error al obtener producto' });
    }
});

module.exports = router;
