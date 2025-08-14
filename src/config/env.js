// src/config/env.js
import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
  PORT: process.env.PORT || 8080,
  PERSISTENCE: (process.env.PERSISTENCE || 'filesystem').toLowerCase(),
  MONGO_URI: process.env.MONGO_URI || '',
  DB_NAME: process.env.DB_NAME || '',
  JWT_SECRET: process.env.JWT_SECRET || 'jwtSecret',
  JWT_EXPIRES: process.env.JWT_EXPIRES || '24h',
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS || 10),
  PASSWORD_RESET_EXPIRES: process.env.PASSWORD_RESET_EXPIRES || '1h',
  MAIL_HOST: process.env.MAIL_HOST || '',
  MAIL_PORT: Number(process.env.MAIL_PORT || 587),
  MAIL_USER: process.env.MAIL_USER || '',
  MAIL_PASS: process.env.MAIL_PASS || '',
  MAIL_FROM: process.env.MAIL_FROM || 'no-reply@example.com',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || ''
};
