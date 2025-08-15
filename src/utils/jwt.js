// src/utils/jwt.js
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.js';

export function signToken(payload) {
  return jwt.sign(payload, envConfig.JWT_SECRET, { expiresIn: envConfig.JWT_EXPIRES });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, envConfig.JWT_SECRET);
  } catch (err) {
    // re-lanzar para que el middleware se encargue si quiere, o devolver null
    throw err;
  }
}
