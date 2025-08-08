// src/routes/carts.router.js
import { Router } from 'express';
import {
  createCart,
  getCartById,
  addProductToCart
} from '../controllers/cart.controller.js';

import { CartManager } from '../dao/factory.js';

const router = Router();

// Inyectamos el manager en cada controlador
router.post('/', (req, res) => createCart(req, res, new CartManager()));
router.get('/:cid', (req, res) => getCartById(req, res, new CartManager()));
router.post('/:cid/product/:pid', (req, res) => addProductToCart(req, res, new CartManager()));

export default router;
