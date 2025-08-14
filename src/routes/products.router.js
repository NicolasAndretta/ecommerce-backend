// src/routes/products.router.js
import { Router } from 'express';
import * as ctrl from '../controllers/product.controller.js';
import { authenticateJWT, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', ctrl.getAllProducts);
router.get('/:pid', ctrl.getProductById);
router.post('/', authenticateJWT, authorizeRoles('admin'), ctrl.createProduct);
router.put('/:pid', authenticateJWT, authorizeRoles('admin'), ctrl.updateProduct);
router.delete('/:pid', authenticateJWT, authorizeRoles('admin'), ctrl.deleteProduct);

export default router;
