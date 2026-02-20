const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

/* ================= GET ================= */
router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT
        id_producto,
        nombre,
        altura,
        peso,
        stock,
        precio,
        marca,
        material,
        descripcion,
        imagen
      FROM producto
      ORDER BY id_producto
    `);

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener inventario" });
  }
});

/* ================= POST ================= */
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const {
      nombre,
      altura,
      peso,
      stock,
      material,
      marca,
      precio,
      descripcion
    } = req.body;

    const imagen = req.file
      ? `uploads/${req.file.filename}`
      : null;

    const [result] = await pool.query(`
      INSERT INTO producto
      (nombre, altura, peso, stock, material, marca, precio, descripcion, imagen)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      nombre,
      altura,
      peso,
      stock || 0,
      material,
      marca,
      precio,
      descripcion,
      imagen
    ]);

    res.status(201).json({
      message: "Producto creado correctamente",
      id_producto: result.insertId
    });

  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({
      error: "Error al crear producto",
      details: error.message
    });
  }
});

// DELETE eliminar producto
router.delete('/:id', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { id } = req.params;

    // Verificar que el producto existe
    const [producto] = await connection.query(
      'SELECT id_producto, nombre FROM producto WHERE id_producto = ?',
      [id]
    );

    if (producto.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // 1. Obtener todos los movimientos del producto
    const [movimientos] = await connection.query(
      'SELECT id_movimiento FROM movimiento WHERE id_producto = ?',
      [id]
    );

    // 2. Eliminar entradas y salidas asociadas a esos movimientos
    if (movimientos.length > 0) {
      const movimientoIds = movimientos.map(m => m.id_movimiento);

      // Eliminar de tabla entrada
      await connection.query(
        `DELETE FROM entrada WHERE id_movimiento IN (?)`,
        [movimientoIds]
      );

      // Eliminar de tabla salida
      await connection.query(
        `DELETE FROM salida WHERE id_movimiento IN (?)`,
        [movimientoIds]
      );
    }

    // 3. Eliminar movimientos del producto
    await connection.query(
      'DELETE FROM movimiento WHERE id_producto = ?',
      [id]
    );

    // 4. Eliminar de la tabla stock
    await connection.query(
      'DELETE FROM stock WHERE id_producto = ?',
      [id]
    );

    // 5. Finalmente eliminar el producto
    await connection.query(
      'DELETE FROM producto WHERE id_producto = ?',
      [id]
    );

    await connection.commit();

    res.status(200).json({
      message: "Producto eliminado exitosamente",
      producto: producto[0].nombre
    });

  } catch (error) {
    await connection.rollback();
    console.error("Error al eliminar producto:", error);
    res.status(500).json({
      error: "Error al eliminar el producto",
      details: error.message
    });
  } finally {
    connection.release();
  }
});
module.exports = router;