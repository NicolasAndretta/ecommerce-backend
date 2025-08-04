// src/routes/carts.router.js
import { Router } from 'express';
import {
  createCart,
  getCartById,
  addProductToCart
} from '../controllers/cart.controller.js';

const router = Router();

router.post('/', createCart);
router.get('/:cid', getCartById);
router.post('/:cid/product/:pid', addProductToCart);

export default router;

