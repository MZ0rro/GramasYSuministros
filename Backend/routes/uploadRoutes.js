const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Carpeta donde guardará
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// POST para subir archivo
router.post('/', upload.single('file'), (req, res) => {
  try {
    console.log('Archivo recibido:', req.file);
    res.json({
      message: 'Archivo subido correctamente',
      file: req.file
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir archivo' });
  }
});

module.exports = router;
