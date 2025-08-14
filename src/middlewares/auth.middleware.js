// src/middlewares/auth.middleware.js
import { verifyToken } from '../utils/jwt.js';
import { UserManager } from '../dao/factory.js';

const userManager = new UserManager();

export const authenticateJWT = (req, res, next) => {
  try {
    const header = req.headers.authorization || req.headers.Authorization;
    if (!header) return res.status(401).json({ error: 'No token provided' });
    const token = header.startsWith('Bearer ') ? header.split(' ')[1] : header;
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token', details: err.message });
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
    const role = req.user.role || 'user';
    if (!allowedRoles.includes(role)) return res.status(403).json({ error: 'Access denied: insufficient role' });
    next();
  };
};
