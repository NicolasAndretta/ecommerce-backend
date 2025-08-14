// src/dao/filesystem/managers/FSCartManager.js
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import FSBaseManager from './FSBaseManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE = path.resolve(__dirname, '../../data/carts.json');

export default class FSCartManager extends FSBaseManager {
  constructor(filePath = FILE) { super(filePath); }

  async createCart() {
    const all = await this._readFile();
    const newCart = { id: crypto.randomUUID(), products: [] };
    all.push(newCart);
    await this._writeFile(all);
    return newCart;
  }

  async getCartById(id) {
    const all = await this._readFile();
    return all.find(c => c.id === id) || null;
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const all = await this._readFile();
    const cart = all.find(c => c.id === cartId);
    if (!cart) return null;
    const p = cart.products.find(x => x.product === productId);
    if (p) p.quantity += Number(quantity);
    else cart.products.push({ product: productId, quantity: Number(quantity) });
    await this._writeFile(all);
    return cart;
  }

  // other methods: removeProductFromCart, updateProductQuantity, updateCartProducts, deleteCart
  async removeProductFromCart(cartId, productId) {
    const all = await this._readFile();
    const cart = all.find(c => c.id === cartId);
    if (!cart) return null;
    cart.products = cart.products.filter(p => p.product !== productId);
    await this._writeFile(all);
    return cart;
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const all = await this._readFile();
    const cart = all.find(c => c.id === cartId);
    if (!cart) return null;
    const p = cart.products.find(x => x.product === productId);
    if (!p) return null;
    p.quantity = Number(quantity);
    await this._writeFile(all);
    return cart;
  }

  async updateCartProducts(cartId, newProducts = []) {
    const all = await this._readFile();
    const cart = all.find(c => c.id === cartId);
    if (!cart) return null;
    cart.products = newProducts;
    await this._writeFile(all);
    return cart;
  }

  async deleteCart(cartId) {
    const all = await this._readFile();
    const idx = all.findIndex(c => c.id === cartId);
    if (idx === -1) return null;
    const [deleted] = all.splice(idx,1);
    await this._writeFile(all);
    return deleted;
  }
}
