// src/repositories/cart.repository.js
import { CartManager } from '../dao/factory.js';
const cartDao = new CartManager();

export default class CartRepository {
  async create() { return cartDao.createCart(); }
  async getById(id) { return cartDao.getCartById(id); }
  async addProduct(cartId, productId, qty=1) { return cartDao.addProductToCart(cartId, productId, qty); }
  async removeProduct(cartId, productId) { return cartDao.removeProductFromCart(cartId, productId); }
  async updateQuantity(cartId, productId, qty) { return cartDao.updateProductQuantity(cartId, productId, qty); }
}
