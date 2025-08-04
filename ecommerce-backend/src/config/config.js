// src/config/config.js
import { envConfig } from './env.js';

export default {
  persistence: envConfig.PERSISTENCE,
  port: envConfig.PORT,
  mongoUri: envConfig.MONGO_URI,
  jwtSecret: envConfig.JWT_SECRET,
};
