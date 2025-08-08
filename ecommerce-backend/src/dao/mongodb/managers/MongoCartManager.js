import CartModel from '../models/cart.model.js';

export default class MongoCartManager {
  async createCart() {
    const newCart = await CartModel.create({ products: [] });
    return newCart.toObject ? newCart.toObject() : newCart;
  }

  async getCartById(id) {
    const cart = await CartModel.findById(id).populate('products.product').lean();
    return cart || null;
  }

  async addProductToCart(cartId, productId, quantity = 1) {
    const cart = await CartModel.findById(cartId);
    if (!cart) return null;

    const idx = cart.products.findIndex(p => p.product.toString() === productId.toString());
    if (idx !== -1) {
      cart.products[idx].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

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
    cart.products[idx].quantity = quantity;
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
