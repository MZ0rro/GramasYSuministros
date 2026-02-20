const express = require('express');
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  verifyCode,
  resetPassword,
  updateProfile
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

router.post('/forgot-password', forgotPassword);
router.post('/verify-code', verifyCode);
router.post('/reset-password', resetPassword);

router.put('/perfil/:id_usuario', updateProfile);

module.exports = router;
