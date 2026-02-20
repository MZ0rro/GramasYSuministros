const express = require('express');
const router = express.Router();
const pool = require('../db');

// Obtener pedidos del usuario (basado en la tabla salida)
router.get('/pedidos/:id_usuario', async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const [rows] = await pool.query(
            `SELECT m.id_movimiento, m.fecha, m.cantidad, p.nombre as producto, s.destino, s.motivo
             FROM movimiento m
             JOIN producto p ON m.id_producto = p.id_producto
             JOIN salida s ON m.id_movimiento = s.id_movimiento
             WHERE m.id_usuario = ? AND m.tipo = 'salida'
             ORDER BY m.fecha DESC`,
            [id_usuario]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener pedidos" });
    }
});

// Obtener cotizaciones del usuario (Mock por ahora ya que no hay tabla)
router.get('/cotizaciones/:id_usuario', async (req, res) => {
    try {
        // En una implementación real, buscaríamos en una tabla 'cotizacion'
        // Por ahora devolvemos un array vacío o datos de prueba
        res.json([
            { id: 1, fecha: new Date(), total: 150000, estado: 'Pendiente', descripcion: 'Cotización de grama residencial' }
        ]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error al obtener cotizaciones" });
    }
});

// Realizar una compra
router.post('/comprar', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        const { id_usuario, id_producto, cantidad } = req.body;

        // 1. Verificar stock actual
        const [stockRow] = await connection.query(
            "SELECT cantidad_actual FROM stock WHERE id_producto = ?",
            [id_producto]
        );

        if (stockRow.length === 0 || stockRow[0].cantidad_actual < cantidad) {
            throw new Error("Stock insuficiente");
        }

        // 2. Insertar en movimiento (salida)
        const [movResult] = await connection.query(
            `INSERT INTO movimiento (id_producto, id_usuario, fecha, cantidad, detalle, tipo)
             VALUES (?, ?, NOW(), ?, 'Compra desde catálogo', 'salida')`,
            [id_producto, id_usuario, cantidad]
        );
        const id_movimiento = movResult.insertId;

        // 3. Insertar en salida
        await connection.query(
            `INSERT INTO salida (id_movimiento, destino, motivo, observaciones)
             VALUES (?, 'Venta Online', 'Venta', 'Compra realizada por el cliente desde el catálogo')`,
            [id_movimiento]
        );

        // 4. Actualizar stock en tabla 'stock'
        await connection.query(
            "UPDATE stock SET cantidad_actual = cantidad_actual - ? WHERE id_producto = ?",
            [cantidad, id_producto]
        );

        // 5. Actualizar stock en tabla 'producto' (parece que hay redundancia en el modelo)
        await connection.query(
            "UPDATE producto SET stock = stock - ? WHERE id_producto = ?",
            [cantidad, id_producto]
        );

        await connection.commit();
        res.json({ message: "Compra realizada con éxito" });

    } catch (err) {
        await connection.rollback();
        console.error(err);
        res.status(400).json({ message: err.message || "Error al procesar la compra" });
    } finally {
        connection.release();
    }
});

module.exports = router;
