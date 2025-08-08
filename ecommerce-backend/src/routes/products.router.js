// src/routes/products.router.js
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';

import { ProductManager } from '../dao/factory.js'; // Selección de persistencia actual

const router = Router();

// Creamos una sola instancia del manager para reusar
const productManager = new ProductManager();

// Inyectamos el manager en cada función pero ya creado
router.get('/', (req, res) => getAllProducts(req, res, productManager));
router.get('/:pid', (req, res) => getProductById(req, res, productManager));
router.post('/', (req, res) => createProduct(req, res, productManager));
router.put('/:pid', (req, res) => updateProduct(req, res, productManager));
router.delete('/:pid', (req, res) => deleteProduct(req, res, productManager));

export default router;
