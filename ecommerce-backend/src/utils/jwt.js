import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'claveSecreta123';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '24h';

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
