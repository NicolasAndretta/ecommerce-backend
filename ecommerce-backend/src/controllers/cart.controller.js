// src/controllers/cart.controller.js

// Crear un carrito nuevo
export const createCart = async (req, res, cartService) => {
  try {
    const cart = await cartService.createCart();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear carrito' });
  }
};

// Obtener un carrito por ID
export const getCartById = async (req, res, cartService) => {
  try {
    const cart = await cartService.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
};

// Agregar producto a un carrito
export const addProductToCart = async (req, res, cartService) => {
  try {
    const updatedCart = await cartService.addProductToCart(req.params.cid, req.params.pid);
    if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado' });
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};
