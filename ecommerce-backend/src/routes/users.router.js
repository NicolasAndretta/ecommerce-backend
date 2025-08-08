// src/routes/user.routes.js
import { Router } from 'express';
import {
  createUser,
  getUserByEmail
} from '../controllers/user.controller.js';

const router = Router();

// Crear un nuevo usuario
router.post('/', createUser);

// Buscar un usuario por email (por query param)
router.get('/', getUserByEmail);

export default router;
