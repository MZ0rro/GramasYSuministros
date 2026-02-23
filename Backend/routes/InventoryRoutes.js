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



// GET: TRAER TODOS LOS PRODUCTOS EXISTENTES

router.get("/", async (req, res) => {
  try {
    const [results] = await pool.query(`
      SELECT
        p.id_producto,
        p.nombre,
        p.altura,
        p.peso,
        IFNULL(s.cantidad_actual, 0) AS stock,
        p.precio,
        p.marca,
        p.material,
        p.descripcion,
        p.imagen
      FROM producto p
      LEFT JOIN stock s 
        ON p.id_producto = s.id_producto
      ORDER BY p.id_producto
    `);

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener inventario" });
  }
});



// GET: TRAER SOLO UN PRODUCTO POR SU ID

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [results] = await pool.query(`
      SELECT
        p.id_producto,
        p.nombre,
        p.altura,
        p.peso,
        IFNULL(s.cantidad_actual, 0) AS stock,
        p.precio,
        p.marca,
        p.material,
        p.descripcion,
        p.imagen
      FROM producto p
      LEFT JOIN stock s 
        ON p.id_producto = s.id_producto
      WHERE p.id_producto = ?
    `, [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    res.json(results[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener producto" });
  }
});



// CREATE: INSERTAR PRODUCTO NUEVO

router.post('/', upload.single('imagen'), async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      nombre,
      marca,
      peso,
      material,
      descripcion,
      precio,
      altura,
      stock
    } = req.body;

    const imagen = req.file ? `uploads/${req.file.filename}` : null;

    // 1. Insertar en tabla producto
    const [result] = await connection.query(`
      INSERT INTO producto (
        nombre, marca, peso, material, descripcion, 
        precio, altura, imagen
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      nombre,
      marca,
      peso,
      material,
      descripcion,
      precio,
      altura,
      imagen
    ]);

    const idProducto = result.insertId;

    // 2. Insertar en tabla stock (inicializar)
    await connection.query(`
      INSERT INTO stock (id_producto, cantidad_actual, nivel_minimo)
      VALUES (?, ?, ?)
    `, [idProducto, stock || 0, 10]); // Nivel mínimo por defecto 10

    await connection.commit();

    res.status(201).json({
      message: "Producto creado exitosamente",
      id_producto: idProducto
    });

  } catch (error) {
    await connection.rollback();
    console.error("Error al crear producto:", error);
    res.status(500).json({
      error: "Error al crear el producto",
      details: error.message
    });
  } finally {
    connection.release();
  }
});



// UPDATE: ACTUALIZAR PRODUCTO EXISTENTE

router.put('/:id', upload.single('imagen'), async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { id } = req.params;
    const {
      nombre,
      marca,
      peso,
      material,
      descripcion,
      precio,
      altura,
    } = req.body;

    // Verificar que el producto existe
    const [productoExistente] = await connection.query(
      'SELECT imagen FROM producto WHERE id_producto = ?',
      [id]
    );

    if (productoExistente.length === 0) {
      await connection.rollback();
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Determinar la imagen a usar (nueva o mantener la existente)
    const imagen = req.file
      ? `uploads/${req.file.filename}`
      : productoExistente[0].imagen;

    // Actualizar producto
    await connection.query(`
      UPDATE producto 
      SET nombre = ?, marca = ?, peso = ?, material = ?, 
          descripcion = ?, precio = ?, altura = ?, imagen = ?
      WHERE id_producto = ?
    `, [
      nombre,
      marca,
      peso,
      material,
      descripcion,
      precio,
      altura,
      imagen,
      id
    ]);

    await connection.commit();

    res.status(200).json({
      message: "Producto actualizado exitosamente",
      id_producto: id
    });

  } catch (error) {
    await connection.rollback();
    console.error("Error al actualizar producto:", error);
    res.status(500).json({
      error: "Error al actualizar el producto",
      details: error.message
    });
  } finally {
    connection.release();
  }
});



// DELETE: ELIMINAR PRODUCTO EXISTENTE

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