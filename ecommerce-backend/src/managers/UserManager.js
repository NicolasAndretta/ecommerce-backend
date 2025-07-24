import fs from 'fs/promises';
import { join } from 'path';

const usersFile = join(process.cwd(), 'src', 'data', 'users.json');

export class UserManager {
  constructor() {
    this.path = usersFile;
  }

  async getUsers() {
    try {
      const file = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(file);
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
      id: Date.now().toString(),
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
