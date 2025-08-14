// src/services/cart.service.js
import CartRepository from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import TicketRepository from '../repositories/ticket.repository.js';

const cartRepo = new CartRepository();
const prodRepo = new ProductRepository();
const ticketRepo = new TicketRepository();

export default class CartService {
  async createCart() { return cartRepo.create(); }
  async getCartById(id) { return cartRepo.getById(id); }
  async addProduct(cartId, productId, qty=1) {
    // business rule: only user role can add — enforced at controller middleware
    const product = await prodRepo.getById(productId);
    if (!product) throw new Error('Product not found');
    if (product.stock < qty) throw new Error('Not enough stock');
    return cartRepo.addProduct(cartId, productId, qty);
  }

  // Purchase flow: checks stock, reduces stock, creates ticket for purchased items and returns remainder
  async purchase(cartId, purchaserEmail) {
    const cart = await cartRepo.getById(cartId);
    if (!cart) throw new Error('Cart not found');
    const purchased = [];
    const notPurchased = [];
    // Iterate cart products
    for (const item of cart.products) {
      const prod = await prodRepo.getById(item.product);
      if (!prod) { notPurchased.push(item); continue; }
      if (prod.stock >= item.quantity) {
        // decrease stock
        await prodRepo.update(prod.id || prod._id, { stock: prod.stock - item.quantity });
        purchased.push({ product: prod, quantity: item.quantity });
      } else {
        notPurchased.push({ product: prod, quantity: item.quantity });
      }
    }

    // create ticket 
    const amount = purchased.reduce((s, it) => s + (it.product.price * it.quantity), 0);
    if (purchased.length > 0) {
      const ticket = await ticketRepo.create({ code: `TICKET-${Date.now()}`, amount, purchaser: purchaserEmail });
      // update cart
      const remainingProducts = notPurchased.map(p => ({ product: p.product.id || p.product._id || p.product, quantity: p.quantity }));
      await cartRepo.updateCartProducts ? cartRepo.updateCartProducts(cartId, remainingProducts) : null;
      return { ticket, notPurchased };
    } else {
      return { ticket: null, notPurchased };
    }
  }
}
