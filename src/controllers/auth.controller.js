// src/controllers/auth.controller.js
import UserService from '../services/user.service.js';
import { signToken } from '../utils/jwt.js';
import { comparePassword } from '../utils/password.js';

const svc = new UserService();

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y password requeridos' });
    }

    const user = await svc.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const passwordMatches = comparePassword(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const payload = {
      id: user.id || user._id,
      email: user.email,
      role: user.role || 'user'
    };

    const token = signToken(payload);
    return res.json({
      status: 'success',
      token,
      user: { id: payload.id, email: payload.email, role: payload.role }
    });
  } catch (err) {
    console.error('auth.login error:', err);
    return res.status(500).json({ error: 'Error interno' });
  }
};
