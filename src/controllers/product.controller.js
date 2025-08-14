// src/controllers/product.controller.js
import ProductService from '../services/product.service.js';

const svc = new ProductService();

export const getAllProducts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || null; // 'asc' or 'desc'
    const query = req.query.category ? { category: req.query.category } : {};
    const result = await svc.list(limit, page, sort, query);
    res.json({ status: 'success', data: result });
  } catch (err) { res.status(500).json({ status:'error', message: err.message }); }
};

export const getProductById = async (req, res) => {
  try {
    const p = await svc.get(req.params.pid);
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json({ status: 'success', data: p });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const createProduct = async (req, res) => {
  try {
    const newP = await svc.create(req.body);
    res.status(201).json({ status:'success', data: newP });
  } catch (err) { res.status(400).json({ status:'error', message: err.message }); }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await svc.update(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ status:'success', data: updated });
  } catch (err) { res.status(400).json({ status:'error', message: err.message }); }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await svc.delete(req.params.pid);
    if (!deleted) return res.status(404).json({ error:'Not found' });
    res.json({ status:'success', message: 'Deleted' });
  } catch (err) { res.status(500).json({ status:'error', message: err.message }); }
};
