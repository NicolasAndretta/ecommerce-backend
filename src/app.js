// src/app.js
import express from 'express';
import handlebars from 'express-handlebars';
import config from './config/config.js';
import { connectToMongo } from './config/dbConnection.js';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import ticketsRouter from './routes/tickets.router.js';
import authRouter from './routes/auth.router.js';
import UserService from './services/user.service.js';

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

// Home
app.get('/', (req, res) => {
  res.render('products', { title: 'Products', docs: [] });
});

// Routes
app.use('/api/auth', authRouter);
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

// START
(async () => {
  if (config.persistence === 'mongodb') {
    await connectToMongo();
  }

  // Seed admin user if configured and not present
  const adminEmail = config.admin?.email;
  const adminPass = config.admin?.password;
  if (adminEmail && adminPass) {
    try {
      const userSvc = new UserService();
      const exists = await userSvc.getUserByEmail(adminEmail);
      if (!exists) {
        await userSvc.createUser({ first_name: 'Admin', last_name: 'Admin', email: adminEmail, password: adminPass, role: 'admin' });
        console.log('✅ Admin user created from env');
      } else {
        console.log('ℹ️ Admin already exists');
      }
    } catch (err) {
      console.warn('⚠️ Admin seeding failed:', err.message);
    }
  }

  app.listen(config.port, ()=>console.log(`Server listening on http://localhost:${config.port}`));
})();
