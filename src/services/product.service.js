// src/services/product.service.js
import ProductRepository from '../repositories/product.repository.js';
const repo = new ProductRepository();

export default class ProductService {
  async list(limit, page, sort, query) { return repo.getAll(limit, page, sort, query); }
  async get(id) { return repo.getById(id); }
  async create(data) { return repo.create(data); }
  async update(id, data) { return repo.update(id, data); }
  async delete(id) { return repo.delete(id); }
}
