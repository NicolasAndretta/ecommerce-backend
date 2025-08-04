// src/app.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routers (según tus archivos)
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

// Variables de entorno (PORT, etc.)
dotenv.config();

// __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App
const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos -> /src/public
app.use(express.static(path.join(__dirname, 'public')));

// Healthcheck rápido
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ecommerce-detailing', ts: Date.now() });
});

// Rutas principales
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// 404 para rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`
  });
});

// Manejo global de errores
app.use((err, _req, res, _next) => {
  console.error('💥 Error no controlado:', err);
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor'
  });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export default app;
