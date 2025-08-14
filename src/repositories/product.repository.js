// src/repositories/product.repository.js
import { ProductManager } from '../dao/factory.js';

const productDao = new ProductManager();

export default class ProductRepository {
  async getAll(limit, page, sort, query) { return productDao.getProducts(limit, page, sort, query); }
  async getById(id) { return productDao.getProductById(id); }
  async create(data) { return productDao.addProduct(data); }
  async update(id, data) { return productDao.updateProduct(id, data); }
  async delete(id) { return productDao.deleteProduct(id); }
}
