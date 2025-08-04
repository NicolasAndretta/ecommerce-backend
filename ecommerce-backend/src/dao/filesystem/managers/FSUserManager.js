import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_PATH = path.resolve(__dirname, '../../data/users.json');

export default class FSUserManager {
  constructor(filePath = USERS_PATH) {
    this.path = filePath;
  }

  async getUsers() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async saveUsers(users) {
    await fs.writeFile(this.path, JSON.stringify(users, null, 2));
  }

  async createUser({ name, email, password }) {
    if (!name || !email || !password) {
      throw new Error('Faltan campos obligatorios');
    }

    const users = await this.getUsers();
    const exists = users.find(user => user.email === email);

    if (exists) {
      throw new Error('Ya existe un usuario con ese email');
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password
    };

    users.push(newUser);
    await this.saveUsers(users);
    return newUser;
  }

  async getUserByEmail(email) {
    const users = await this.getUsers();
    return users.find(user => user.email === email);
  }
}
