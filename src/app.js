// src/app.js
import express from 'express';
import handlebars from 'express-handlebars';
import config from './config/config.js';
import { connectToMongo } from './config/dbConnection.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import ticketsRouter from './routes/tickets.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main', layoutsDir: './src/views/layouts' }));
app.set('views', './src/views');
app.set('view engine', 'handlebars');

// static
app.use('/public', express.static('./src/public'));

// Health
app.get('/api/health', (req,res)=>res.json({ status:'ok', ts: Date.now() }));

// Home route (agregada)
app.get('/', (req, res) => {
  res.render('products', { title: 'Products', docs: [] });
});

// Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/users', usersRouter);
app.use('/api/tickets', ticketsRouter);

// 404
app.use((req,res)=>res.status(404).json({ status:'error', message:`Not found ${req.method} ${req.originalUrl}` }));

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error', err);
  res.status(500).json({ error:'Internal server error' });
});

// Start
(async () => {
  if (config.persistence === 'mongodb') {
    await connectToMongo();
  }
  app.listen(config.port, ()=>console.log(`Server listening on http://localhost:${config.port}`));
})();