import fs from 'fs/promises';
import path from 'path';

const CARTS_PATH = path.resolve('src/data/carts.json');

export default class CartManager {
  constructor(filePath = CARTS_PATH) {
    this.path = filePath;
  }

  // Cargar carritos
  async #loadCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      return [];
    }
  }

  // Guardar carritos
  async #saveCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }

  // Crear un carrito nuevo
  async createCart() {
    const carts = await this.#loadCarts();

    const newCart = {
      id: crypto.randomUUID(),
      products: []
    };

    carts.push(newCart);
    await this.#saveCarts(carts);
    return newCart;
  }

  // Obtener carrito por ID
  async getCartById(id) {
    const carts = await this.#loadCarts();
    return carts.find((c) => c.id === id) || null;
  }

  // Agregar producto a un carrito
  async addProductToCart(cartId, productId) {
    const carts = await this.#loadCarts();
    const cart = carts.find((c) => c.id === cartId);

    if (!cart) return null;

    const productInCart = cart.products.find((p) => p.product === productId);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await this.#saveCarts(carts);
    return cart;
  }
}
