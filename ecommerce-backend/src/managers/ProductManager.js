import fs from 'fs/promises';
import path from 'path';

const PRODUCTS_PATH = path.resolve('src/data/products.json');

export default class ProductManager {
  constructor(filePath = PRODUCTS_PATH) {
    this.path = filePath;
  }

  // Cargar productos
  async #loadProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  // Guardar productos
  async #saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  // Obtener todos los productos
  async getProducts(limit = null) {
    const products = await this.#loadProducts();
    return limit ? products.slice(0, limit) : products;
  }

  // Obtener un producto por ID
  async getProductById(id) {
    const products = await this.#loadProducts();
    return products.find((p) => p.id === id) || null;
  }

  // Agregar un producto nuevo
  async addProduct({ title, description, code, price, stock, category, thumbnails = [] }) {
    if (!title || !description || !code || !price || !stock || !category) {
      throw new Error('Todos los campos son obligatorios');
    }

    const products = await this.#loadProducts();

    if (products.some((p) => p.code === code)) {
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
      status: true
    };

    products.push(newProduct);
    await this.#saveProducts(products);
    return newProduct;
  }

  // Actualizar un producto
  async updateProduct(id, updatedFields) {
    const products = await this.#loadProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) return null;

    products[index] = {
      ...products[index],
      ...updatedFields,
      id: products[index].id // Nunca permitimos cambiar el ID
    };

    await this.#saveProducts(products);
    return products[index];
  }

  // Eliminar un producto
  async deleteProduct(id) {
    const products = await this.#loadProducts();
    const newList = products.filter((p) => p.id !== id);

    if (newList.length === products.length) return false;

    await this.#saveProducts(newList);
    return true;
  }
}
