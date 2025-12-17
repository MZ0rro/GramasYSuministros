const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET - Obtener historial de entradas de un producto específico
router.get('/:productId', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const { productId } = req.params;

        const [rows] = await connection.query(`
      SELECT 
        m.id_movimiento,
        m.fecha,
        m.cantidad,
        m.tipo,
        p.nombre as producto,
        prov.nombre as proveedor,
        e.precio_unitario,
        e.observaciones,
        s.destino,
        s.motivo
      FROM movimiento m
      LEFT JOIN producto p ON m.id_producto = p.id_producto
      LEFT JOIN entrada e ON m.id_movimiento = e.id_movimiento
      LEFT JOIN proveedor prov ON e.id_proveedor = prov.id_proveedor
      LEFT JOIN salida s ON m.id_movimiento = s.id_movimiento
      WHERE m.id_producto = ?
      ORDER BY m.fecha DESC
    `, [productId]);

        res.json(rows);
    } catch (err) {
        console.error("Error cargando historial de entradas:", err);
        res.status(500).json({ error: "Error al obtener historial de entradas" });
    } finally {
        connection.release();
    }
});

// POST - Crear nueva entrada de inventario
router.post('/', async (req, res) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const {
            id_producto,
            cantidad,
            id_proveedor,
            id_usuario,
            precio_unitario,
            observaciones
        } = req.body;

        // Validaciones
        if (!id_producto || !cantidad || cantidad <= 0) {
            await connection.rollback();
            return res.status(400).json({ error: "Producto y cantidad válida son requeridos" });
        }

        // 1. Insertar en tabla movimiento
        const [movResult] = await connection.query(`
      INSERT INTO movimiento (id_producto, id_usuario, cantidad, tipo, detalle)
      VALUES (?, ?, ?, 'entrada', ?)
    `, [id_producto, id_usuario || 1, cantidad, observaciones || 'Entrada de inventario']);

        const idMovimiento = movResult.insertId;

        // 2. Insertar en tabla entrada
        await connection.query(`
      INSERT INTO entrada (id_movimiento, id_proveedor, precio_unitario, observaciones)
      VALUES (?, ?, ?, ?)
    `, [idMovimiento, id_proveedor || null, precio_unitario || null, observaciones || null]);

        // 3. Actualizar stock
        await connection.query(`
      UPDATE stock 
      SET cantidad_actual = cantidad_actual + ?
      WHERE id_producto = ?
    `, [cantidad, id_producto]);

        // 4. También actualizar el campo stock en la tabla producto
        await connection.query(`
      UPDATE producto 
      SET stock = stock + ?
      WHERE id_producto = ?
    `, [cantidad, id_producto]);

        await connection.commit();

        res.status(201).json({
            message: "Entrada creada exitosamente",
            id_movimiento: idMovimiento
        });

    } catch (error) {
        await connection.rollback();
        console.error("Error al crear entrada:", error);
        res.status(500).json({
            error: "Error al crear la entrada",
            details: error.message
        });
    } finally {
        connection.release();
    }
});

module.exports = router;
