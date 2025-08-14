// src/dao/mongodb/managers/MongoCartManager.js
import CartModel from '../models/cart.model.js';

export default class MongoCartManager {
  async getCarts(limit = 10, page = 1, query = {}) {
    if (typeof CartModel.paginate === 'function') {
      return await CartModel.paginate(query, { limit, page, populate: 'products.product', lean: true });
    } else {
      const skip = (page - 1) * limit;
      const cursor = CartModel.find(query).populate('products.product').skip(skip).limit(limit);
      const docs = await cursor.lean();
      const totalDocs = await CartModel.countDocuments(query);
      return {
        docs,
        totalDocs,
        limit,
        totalPages: Math.max(1, Math.ceil(totalDocs / limit)),
        page,
        hasPrevPage: page > 1,
        hasNextPage: skip + limit < totalDocs,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: skip + limit < totalDocs ? page + 1 : null
      };
    }
  }

  async createCart() {
    const c = await CartModel.create({ products: [] });
    return c.toObject ? c.toObject() : c;
  }

  async getCartById(id) {
    return await CartModel.findById(id).populate('products.product').lean();
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;
    const idx = cart.products.findIndex(p => p.product.toString() === productId.toString());
    if (idx !== -1) cart.products[idx].quantity += Number(quantity);
    else cart.products.push({ product: productId, quantity: Number(quantity) });
    await cart.save();
    return await CartModel.findById(cartId).populate('products.product').lean();
  }

  async removeProductFromCart(cartId, productId) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;
    cart.products = cart.products.filter(p => p.product.toString() !== productId.toString());
    await cart.save();
    return await CartModel.findById(cartId).populate('products.product').lean();
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;
    const idx = cart.products.findIndex(p => p.product.toString() === productId.toString());
    if (idx === -1) return null;
    cart.products[idx].quantity = Number(quantity);
    await cart.save();
    return await CartModel.findById(cartId).populate('products.product').lean();
  }

  async updateCartProducts(cartId, newProducts = []) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;
    cart.products = newProducts;
    await cart.save();
    return await CartModel.findById(cartId).populate('products.product').lean();
  }

  async deleteCart(cartId) {
    const deleted = await CartModel.findByIdAndDelete(cartId).lean();
    return deleted || null;
  }
}
