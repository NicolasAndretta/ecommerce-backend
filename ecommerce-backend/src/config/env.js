// src/config/env.js
export const envConfig = {
  PORT: process.env.PORT || 8080,
  PERSISTENCE: process.env.PERSISTENCE || 'filesystem', // cambiar a 'mongodb' cuando lo implementemos
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'jwtSecret',
};
