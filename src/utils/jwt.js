// src/utils/jwt.js
import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env.js';

export function signToken(payload) {
  return jwt.sign(payload, envConfig.JWT_SECRET, { expiresIn: envConfig.JWT_EXPIRES });
}

export function verifyToken(token) {
  return jwt.verify(token, envConfig.JWT_SECRET);
}
