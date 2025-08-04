// src/config/dbConnection.js
import mongoose from 'mongoose';
import config from './config.js';

export const connectToMongo = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log('[MongoDB] Conectado correctamente');
  } catch (error) {
    console.error('[MongoDB] Error de conexión:', error.message);
    process.exit(1);
  }
};
