// src/middlewares/auth.middleware.js
import { verifyToken } from '../utils/jwt.js';

// authenticateJWT: pone payload en req.user
export const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    const payload = verifyToken(token);
    if (!payload) return res.status(401).json({ error: 'Token inválido' });

    // payload expected: { id, email, role, iat, exp }
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado', details: err.message });
  }
};

// authorizeRoles: verifica que role esté entre allowedRoles
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) return res.status(401).json({ error: 'No autenticado' });
      const role = req.user.role || 'user';
      if (!allowedRoles.includes(role)) return res.status(403).json({ error: 'Acceso denegado: rol insuficiente' });
      next();
    } catch (err) {
      res.status(500).json({ error: 'Error de autorización', details: err.message });
    }
  };
};
