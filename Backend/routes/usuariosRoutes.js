const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        u.id_usuario,
        u.nombre,
        u.apellido,
        u.email,
        u.estado,
        r.tipo AS rol
      FROM usuario u
      JOIN rol r ON u.id_rol = r.id_rol
      ORDER BY u.id_usuario ASC
    `);

    res.json(rows);

  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

// DELETE usuario
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      'DELETE FROM usuario WHERE id_usuario = ?',
      [id]
    );

    res.json({ message: "Usuario eliminado correctamente" });

  } catch (error) {
    console.error("Error eliminando usuario:", error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

module.exports = router;