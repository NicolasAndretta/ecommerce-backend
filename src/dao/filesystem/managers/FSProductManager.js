// src/dao/filesystem/managers/FSProductManager.js
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import FSBaseManager from './FSBaseManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE = path.resolve(__dirname, '../../data/products.json');

export default class FSProductManager extends FSBaseManager {
  constructor(filePath = FILE) { super(filePath); }

  async getProducts(limit = 10, page = 1, sort = null, query = {}) {
    const all = await this._readFile();
    let filtered = all;
    if (query.category) filtered = filtered.filter(p => p.category === query.category);
    if (typeof query.status !== 'undefined') filtered = filtered.filter(p => p.status === query.status);
    if (sort === 'asc') filtered.sort((a,b)=>a.price-b.price);
    if (sort === 'desc') filtered.sort((a,b)=>b.price-a.price);
    const totalDocs = filtered.length;
    const start = (page-1)*limit;
    const docs = filtered.slice(start, start+limit);
    return { docs, totalDocs, limit, totalPages: Math.max(1,Math.ceil(totalDocs/limit)), page };
  }

  async getProductById(id) {
    const all = await this._readFile();
    return all.find(p => p.id === id) || null;
  }

  async addProduct(product) {
    const { title, description, code, price, stock, category } = product;
    if (!title || !description || !code) throw new Error('Missing required product fields');
    const all = await this._readFile();
    if (all.some(p => p.code === code)) throw new Error('Product code exists');
    const newP = { id: crypto.randomUUID(), ...product, price: Number(price), stock: Number(stock), thumbnails: product.thumbnails || [], status: product.status ?? true };
    all.push(newP);
    await this._writeFile(all);
    return newP;
  }

  async updateProduct(id, updated) {
    const all = await this._readFile();
    const idx = all.findIndex(p => p.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...updated, id: all[idx].id };
    await this._writeFile(all);
    return all[idx];
  }

  async deleteProduct(id) {
    const all = await this._readFile();
    const idx = all.findIndex(p => p.id === id);
    if (idx === -1) return null;
    const [deleted] = all.splice(idx,1);
    await this._writeFile(all);
    return deleted;
  }
}
