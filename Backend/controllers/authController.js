const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, id_rol } = req.body;

    const [userExists] = await pool.query(
      "SELECT email FROM usuario WHERE email = ?",
      [email]
    );

    if (userExists.length > 0) {
      return res.status(400).json({ message: "El correo ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO usuario (nombre, apellido, email, password_hash, id_rol, estado)
       VALUES (?, ?, ?, ?, ?, 'activo')`,
      [nombre, apellido, email, hashedPassword, id_rol]
    );

    res.json({ message: "Usuario registrado correctamente" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};



exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [user] = await pool.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user[0].password_hash);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar JWT
    const token = jwt.sign(
      { id_usuario: user[0].id_usuario, id_rol: user[0].id_rol },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

  res.json({
  message: "Login exitoso",
  token,
  role: user[0].id_rol,
  user: {
    id_usuario: user[0].id_usuario,
    nombre: user[0].nombre,
    apellido: user[0].apellido,
    email: user[0].email,
    id_rol: user[0].id_rol
    }
  });


  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
