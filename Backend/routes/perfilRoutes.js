const express = require('express');
const router = express.Router();
const { obtenerPerfil, actualizarPerfil } = require('../controllers/perfilController');

// Obtener información del usuario
router.get('/:id', obtenerPerfil);

// Actualizar información del usuario
router.put('/:id', actualizarPerfil);

module.exports = router;
