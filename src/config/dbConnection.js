// src/config/dbConnection.js
import mongoose from 'mongoose';
import config from './config.js';

export const connectToMongo = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('🟢 [MongoDB] Connected');
  } catch (err) {
    console.error('🔴 [MongoDB] Connection error:', err.message);
    process.exit(1);
  }
};
