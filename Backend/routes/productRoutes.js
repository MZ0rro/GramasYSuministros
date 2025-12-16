const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');

// Configurar multer para subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'product-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'));
    }
  }
});

// GET productos
router.get('/', async (req, res) => {
  try {
    console.log("🔥 GET /api/productos ejecutado");

    const [rows] = await pool.query('SELECT * FROM producto');
    res.json(rows);

  } catch (err) {
    console.error("Error cargando productos:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// POST - Crear nuevo producto
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    console.log("🔥 POST /api/productos ejecutado");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const {
      nombre,
      marca,
      peso,
      material,
      descripcion,
      precio,
      altura,
      stock,
      id_categoria
    } = req.body;

    // Validar campos requeridos
    if (!nombre || !precio) {
      return res.status(400).json({
        error: "Los campos 'nombre' y 'precio' son obligatorios"
      });
    }

    // Validar que el precio sea un número válido
    if (isNaN(parseFloat(precio))) {
      return res.status(400).json({
        error: "El precio debe ser un número válido"
      });
    }

    // Preparar ruta de imagen si existe
    const imagenPath = req.file ? `/uploads/${req.file.filename}` : null;

    // Insertar producto en la base de datos
    const query = `
      INSERT INTO producto 
      (nombre, marca, peso, material, descripcion, precio, altura, stock, id_categoria, imagen)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      nombre,
      marca || null,
      peso || null,
      material || null,
      descripcion || null,
      parseFloat(precio),
      altura || null,
      parseInt(stock) || 0,
      id_categoria || null,
      imagenPath
    ];

    const [result] = await pool.query(query, values);
    const productId = result.insertId;

    // Crear entrada en la tabla stock
    const stockQuery = `
      INSERT INTO stock (id_producto, cantidad_actual, nivel_minimo)
      VALUES (?, ?, ?)
    `;

    await pool.query(stockQuery, [productId, parseInt(stock) || 0, 10]);

    console.log("✅ Producto creado con ID:", productId);

    res.status(201).json({
      message: "Producto creado exitosamente",
      id_producto: productId,
      nombre: nombre,
      imagen: imagenPath
    });

  } catch (err) {
    console.error("❌ Error creando producto:", err);

    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({
        error: "Ya existe un producto con ese nombre o identificador único."
      });
    }

    res.status(500).json({
      error: "Error al crear el producto",
      details: err.message
    });
  }
});

// DELETE - Eliminar producto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔥 DELETE /api/productos/${id} ejecutado`);

    // Verificar que el producto existe
    const [producto] = await pool.query(
      'SELECT * FROM producto WHERE id_producto = ?',
      [id]
    );

    if (producto.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // 1. Obtener los IDs de movimientos asociados al producto
    const [movimientos] = await pool.query(
      'SELECT id_movimiento FROM movimiento WHERE id_producto = ?',
      [id]
    );

    const movimientoIds = movimientos.map(m => m.id_movimiento);

    if (movimientoIds.length > 0) {
      // 2. Eliminar entradas y salidas asociadas a esos movimientos
      // Usamos IN (?) para pasar el array de IDs
      await pool.query('DELETE FROM entrada WHERE id_movimiento IN (?)', [movimientoIds]);
      await pool.query('DELETE FROM salida WHERE id_movimiento IN (?)', [movimientoIds]);

      // 3. Eliminar los movimientos
      await pool.query('DELETE FROM movimiento WHERE id_producto = ?', [id]);
    }

    // 4. Eliminar de la tabla stock (por foreign key)
    await pool.query('DELETE FROM stock WHERE id_producto = ?', [id]);

    // 5. Finalmente eliminar el producto
    await pool.query('DELETE FROM producto WHERE id_producto = ?', [id]);

    console.log(`✅ Producto ${id} eliminado exitosamente`);

    res.status(200).json({
      message: "Producto eliminado exitosamente",
      id_producto: id
    });

  } catch (err) {
    console.error("❌ Error eliminando producto:", err);
    res.status(500).json({
      error: "Error al eliminar el producto",
      details: err.message
    });
  }
});

module.exports = router;
