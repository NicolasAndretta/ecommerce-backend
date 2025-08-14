// src/dao/filesystem/managers/FSUserManager.js
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import FSBaseManager from './FSBaseManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FILE = path.resolve(__dirname, '../../data/users.json');

export default class FSUserManager extends FSBaseManager {
  constructor(filePath = FILE) { super(filePath); }

  async createUser(userData) {
    const users = await this._readFile();
    if (users.some(u => u.email === userData.email)) throw new Error('User exists');
    const newU = { id: crypto.randomUUID(), ...userData };
    users.push(newU);
    await this._writeFile(users);
    return newU;
  }

  async getUsers(limit = 10, page = 1, query = {}) {
    const users = await this._readFile();
    const totalDocs = users.length;
    const start = (page-1)*limit;
    const docs = users.slice(start,start+limit);
    return { docs, totalDocs, limit, totalPages: Math.max(1, Math.ceil(totalDocs/limit)), page };
  }

  async getUserByEmail(email) {
    const users = await this._readFile();
    return users.find(u => u.email === email) || null;
  }

  async getUserById(id) {
    const users = await this._readFile();
    return users.find(u => u.id === id) || null;
  }

  async updateUser(id, updated) {
    const users = await this._readFile();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updated, id: users[idx].id };
    await this._writeFile(users);
    return users[idx];
  }

  async deleteUser(id) {
    const users = await this._readFile();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    const [deleted] = users.splice(idx,1);
    await this._writeFile(users);
    return deleted;
  }
}
