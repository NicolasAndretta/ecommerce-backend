import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCTS_PATH = path.resolve(__dirname, '../../../data/products.json');

export default class FSProductManager {
  constructor(filePath = PRODUCTS_PATH) {
    this.path = filePath;
  }

  async #loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async #saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  // Firma compatible con la versión Mongo (limit,page,sort,query)
  async getProducts(limit = 10, page = 1, sort = null, query = {}) {
    let products = await this.#loadProducts();

    // filtros simples
    if (query.category) {
      products = products.filter(p => p.category === query.category);
    }
    if (typeof query.status !== 'undefined') {
      products = products.filter(p => p.status === query.status);
    }

    // orden por price
    if (sort === 'asc') products.sort((a, b) => a.price - b.price);
    else if (sort === 'desc') products.sort((a, b) => b.price - a.price);

    // paginación simulada
    const start = (page - 1) * limit;
    const docs = products.slice(start, start + limit);

    return {
      docs,
      totalDocs: products.length,
      limit,
      totalPages: Math.ceil(products.length / limit) || 1,
      page,
      hasPrevPage: page > 1,
      hasNextPage: start + limit < products.length,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: start + limit < products.length ? page + 1 : null
    };
  }

  async getProductById(id) {
    const products = await this.#loadProducts();
    return products.find(p => p.id === id) || null;
  }

  async addProduct({ title, description, code, price, stock, category, thumbnails = [], status = true }) {
    if (!title || !description || !code || typeof price === 'undefined' || typeof stock === 'undefined' || !category) {
      throw new Error('Todos los campos son obligatorios: title, description, code, price, stock, category');
    }

    const products = await this.#loadProducts();

    if (products.some(p => p.code === code)) {
      throw new Error('Ya existe un producto con ese código');
    }

    const newProduct = {
      id: crypto.randomUUID(),
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails: Array.isArray(thumbnails) ? thumbnails : [thumbnails],
      status
    };

    products.push(newProduct);
    await this.#saveProducts(products);
    return newProduct;
  }

  async updateProduct(id, updatedFields) {
    const products = await this.#loadProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Producto no encontrado para actualizar');

    products[idx] = {
      ...products[idx],
      ...updatedFields,
      id: products[idx].id // proteger id
    };

    await this.#saveProducts(products);
    return products[idx];
  }

  async deleteProduct(id) {
    const products = await this.#loadProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Producto no encontrado para eliminar');

    const [deleted] = products.splice(idx, 1);
    await this.#saveProducts(products);
    return deleted;
  }
}
