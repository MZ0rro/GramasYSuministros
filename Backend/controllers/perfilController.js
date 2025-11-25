const pool = require('../db');

// Obtener datos del usuario
exports.obtenerPerfil = async (req, res) => {
  try {
    const { id } = req.params;

    const [user] = await pool.query(
      "SELECT id_usuario, nombre, apellido, email FROM usuario WHERE id_usuario = ?",
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener perfil" });
  }
};

// Actualizar perfil
exports.actualizarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Correo inválido" });
    }

    await pool.query(
      `UPDATE usuario 
       SET nombre = ?, apellido = ?, email = ?
       WHERE id_usuario = ?`,
      [nombre, apellido, email, id]
    );

    res.json({ success: true, message: "Perfil actualizado con éxito" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar perfil" });
  }
};