import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_PATH = path.resolve(__dirname, '../../../data/users.json');

export default class FSUserManager {
  constructor(filePath = USERS_PATH) {
    this.path = filePath;
  }

  async #loadUsers() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async #saveUsers(users) {
    await fs.writeFile(this.path, JSON.stringify(users, null, 2));
  }

  async createUser({ first_name, last_name, email, password, age = null, role = 'user', cart = null }) {
    if (!first_name || !last_name || !email || !password) {
      throw new Error('Faltan campos obligatorios: first_name, last_name, email, password');
    }

    const users = await this.#loadUsers();
    if (users.some(u => u.email === email)) throw new Error('Ya existe un usuario con ese email');

    const newUser = {
      id: crypto.randomUUID(),
      first_name,
      last_name,
      email,
      password,
      age,
      role,
      cart
    };

    users.push(newUser);
    await this.#saveUsers(users);
    return newUser;
  }

  async getUsers() {
    return await this.#loadUsers();
  }

  async getUserByEmail(email) {
    const users = await this.#loadUsers();
    return users.find(u => u.email === email) || null;
  }

  async getUserById(id) {
    const users = await this.#loadUsers();
    return users.find(u => u.id === id) || null;
  }

  async updateUser(id, updatedFields) {
    const users = await this.#loadUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('Usuario no encontrado para actualizar');
    users[idx] = { ...users[idx], ...updatedFields, id: users[idx].id };
    await this.#saveUsers(users);
    return users[idx];
  }

  async deleteUser(id) {
    const users = await this.#loadUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) throw new Error('Usuario no encontrado para eliminar');
    const [deleted] = users.splice(idx, 1);
    await this.#saveUsers(users);
    return deleted;
  }
}
