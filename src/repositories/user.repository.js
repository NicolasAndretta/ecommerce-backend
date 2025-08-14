// src/repositories/user.repository.js
import { UserManager } from '../dao/factory.js';
const userDao = new UserManager();

export default class UserRepository {
  async create(user) { return userDao.createUser(user); }
  async getByEmail(email) { return userDao.getUserByEmail(email); }
  async getById(id) { return userDao.getUserById(id); }
  async update(id, data) { return userDao.updateUser(id, data); }
}
