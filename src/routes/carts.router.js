// src/routes/carts.router.js
import { Router } from 'express';
import * as ctrl from '../controllers/cart.controller.js';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', ctrl.createCart);
router.get('/:cid', ctrl.getCartById);
router.post('/:cid/product/:pid', authenticateJWT, authorizeRoles('user'), ctrl.addProductToCart);
router.post('/:cid/purchase', authenticateJWT, authorizeRoles('user'), ctrl.purchaseCart);

export default router;
