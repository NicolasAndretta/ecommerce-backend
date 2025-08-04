// src/routes/users.router.js
import { Router } from 'express';
import {
  createUser,
  getUserByEmail
} from '../controllers/user.controller.js';

const router = Router();

router.post('/', createUser);
router.get('/', getUserByEmail);

export default router;
