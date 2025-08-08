export default {
  persistence: process.env.PERSISTENCE || 'MONGO', // Cambiar a 'FILE' si querés
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce'
};
