// src/controllers/cart.controller.js
import { cartService } from '../dao/filesystem/index.js';

export const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear carrito' });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const updatedCart = await cartService.addProductToCart(req.params.cid, req.params.pid);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};
