import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CARTS_PATH = path.resolve(__dirname, '../../../data/carts.json');

export default class FSCartManager {
  constructor(filePath = CARTS_PATH) {
    this.path = filePath;
  }

  async #loadCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async #saveCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  async createCart() {
    const carts = await this.#loadCarts();
    const newCart = { id: crypto.randomUUID(), products: [] };
    carts.push(newCart);
    await this.#saveCarts(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this.#loadCarts();
    return carts.find(c => c.id === id) || null;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.#loadCarts();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null;

    const prod = cart.products.find(p => p.product === productId);
    if (prod) prod.quantity += 1;
    else cart.products.push({ product: productId, quantity: 1 });

    await this.#saveCarts(carts);
    return cart;
  }

  async removeProductFromCart(cartId, productId) {
    const carts = await this.#loadCarts();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null;
    cart.products = cart.products.filter(p => p.product !== productId);
    await this.#saveCarts(carts);
    return cart;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const carts = await this.#loadCarts();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null;
    const prod = cart.products.find(p => p.product === productId);
    if (!prod) return null;
    prod.quantity = quantity;
    await this.#saveCarts(carts);
    return cart;
  }

  async updateCartProducts(cartId, newProducts = []) {
    const carts = await this.#loadCarts();
    const cart = carts.find(c => c.id === cartId);
    if (!cart) return null;
    cart.products = newProducts;
    await this.#saveCarts(carts);
    return cart;
  }

  async deleteCart(cartId) {
    const carts = await this.#loadCarts();
    const idx = carts.findIndex(c => c.id === cartId);
    if (idx === -1) return null;
    const [deleted] = carts.splice(idx, 1);
    await this.#saveCarts(carts);
    return deleted;
  }
}
