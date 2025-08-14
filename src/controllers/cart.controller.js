// src/controllers/cart.controller.js
import CartService from '../services/cart.service.js';

const svc = new CartService();

export const createCart = async (req, res) => {
  try {
    const cart = await svc.createCart();
    res.status(201).json({ status:'success', data: cart });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await svc.getCartById(req.params.cid);
    if (!cart) return res.status(404).json({ error:'Not found' });
    res.json({ status:'success', data: cart });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const addProductToCart = async (req, res) => {
  try {
    const updated = await svc.addProduct(req.params.cid, req.params.pid, req.body.quantity || 1);
    if (!updated) return res.status(404).json({ error:'Not found or insufficient stock' });
    res.json({ status:'success', data: updated });
  } catch (err) { res.status(400).json({ error: err.message }); }
};

export const purchaseCart = async (req, res) => {
  try {
    const purchaser = req.user?.email;
    const result = await svc.purchase(req.params.cid, purchaser);
    res.json({ status:'success', data: result });
  } catch (err) { res.status(400).json({ error: err.message }); }
};
