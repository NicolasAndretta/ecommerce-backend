// src/config/config.js
import { envConfig } from './env.js';

export default {
  port: envConfig.PORT,
  persistence: envConfig.PERSISTENCE,
  mongoUri: envConfig.MONGO_URI,
  dbName: envConfig.DB_NAME, 
  jwtSecret: envConfig.JWT_SECRET,
  jwtExpires: envConfig.JWT_EXPIRES,
  bcryptSaltRounds: envConfig.BCRYPT_SALT_ROUNDS,
  passwordResetExpires: envConfig.PASSWORD_RESET_EXPIRES,
  mail: {
    host: envConfig.MAIL_HOST,
    port: envConfig.MAIL_PORT,
    user: envConfig.MAIL_USER,
    pass: envConfig.MAIL_PASS,
    from: envConfig.MAIL_FROM
  },
  admin: { // nuevo
    email: envConfig.ADMIN_EMAIL,
    password: envConfig.ADMIN_PASSWORD
  }
};
