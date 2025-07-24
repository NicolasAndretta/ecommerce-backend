import { Router } from 'express';
import { UserManager } from '../managers/UserManager.js';

const router = Router();
const userManager = new UserManager();

// Crear nuevo usuario
router.post('/', async (req, res) => {
  try {
    const user = await userManager.createUser(req.body);
    res.status(201).json({ status: 'success', user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

// Obtener usuario por email (query param)
router.get('/', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email requerido' });
  }

  const user = await userManager.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
  }

  res.json({ status: 'success', user });
});

export default router;
