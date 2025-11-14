import express from 'express';
import { obtenerStock } from '../controllers/stockController.js';

const router = express.Router();

router.get('/', obtenerStock);

export default router;