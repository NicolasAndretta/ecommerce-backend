// src/utils/password.js
import bcrypt from 'bcrypt';
import { envConfig } from '../config/env.js';

const SALT_ROUNDS = envConfig.BCRYPT_SALT_ROUNDS;

export function hashPassword(plain) {
  return bcrypt.hashSync(plain, SALT_ROUNDS);
}

export function comparePassword(plain, hashed) {
  return bcrypt.compareSync(plain, hashed);
}
