// src/controllers/user.controller.js
import { userService } from '../dao/filesystem/index.js';

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ status: 'success', user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ status: 'error', message: 'Email requerido' });
  }

  const user = await userService.getUserByEmail(email);
  if (!user) {
    return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });
  }

  res.json({ status: 'success', user });
};
