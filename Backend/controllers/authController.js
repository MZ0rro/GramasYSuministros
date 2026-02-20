const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transporter = require('../config/email');

// -----------------------------------------------
// REGISTER
// -----------------------------------------------
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


// -----------------------------------------------
// LOGIN
// -----------------------------------------------
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


// -----------------------------------------------
// FORGOT PASSWORD (enviar código)
// -----------------------------------------------
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [user] = await pool.query(
      "SELECT * FROM usuario WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "El correo no está registrado" });
    }

    // Generar código de 6 dígitos
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Expira en 10 min
    const expire = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(
      "UPDATE usuario SET reset_code = ?, reset_code_expire = ? WHERE email = ?",
      [code, expire, email]
    );

    // Enviar correo
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Código de recuperación",
      html: `<h2>Tu código es: <strong>${code}</strong></h2>
             <p>Vence en 10 minutos.</p>`
    });

    res.json({ message: "Código enviado al correo" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error enviando el código" });
  }
};


// -----------------------------------------------
// VERIFY CODE
// -----------------------------------------------
exports.verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;

    const [user] = await pool.query(
      "SELECT reset_code, reset_code_expire FROM usuario WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res.status(400).json({ message: "El correo no existe" });
    }

    const data = user[0];

    if (data.reset_code !== code) {
      return res.status(400).json({ message: "Código incorrecto" });
    }

    if (new Date(data.reset_code_expire) < new Date()) {
      return res.status(400).json({ message: "El código expiró" });
    }

    res.json({ message: "Código válido" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error verificando el código" });
  }
};


// -----------------------------------------------
// RESET PASSWORD
// -----------------------------------------------
exports.resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE usuario SET password_hash = ?, reset_code = NULL, reset_code_expire = NULL WHERE email = ?",
      [hashed, email]
    );

    res.json({ message: "Contraseña cambiada correctamente" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error actualizando contraseña" });
  }
};

// -----------------------------------------------
// UPDATE PROFILE
// -----------------------------------------------
exports.updateProfile = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const { id_usuario } = req.params;
    const { nombre, apellido, email, num_telefono, direccion_facturacion } = req.body;

    // Actualizar tabla usuario
    await connection.query(
      "UPDATE usuario SET nombre = ?, apellido = ?, email = ? WHERE id_usuario = ?",
      [nombre, apellido, email, id_usuario]
    );

    // Actualizar tabla cliente
    await connection.query(
      "UPDATE cliente SET num_telefono = ?, direccion_facturacion = ? WHERE id_usuario = ?",
      [num_telefono, direccion_facturacion, id_usuario]
    );

    await connection.commit();

    // Obtener usuario actualizado para el frontend
    const [updatedUser] = await connection.query(
      "SELECT * FROM usuario WHERE id_usuario = ?",
      [id_usuario]
    );

    res.json({ 
      message: "Perfil actualizado correctamente",
      user: updatedUser[0]
    });

  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ message: "Error actualizando el perfil" });
  } finally {
    connection.release();
  }
};