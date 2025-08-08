import UserModel from '../models/user.model.js';

export default class MongoUserManager {
  async getUsers() {
    return await UserModel.find().lean();
  }

  async getUserById(id) {
    return await UserModel.findById(id).lean();
  }

  async getUserByEmail(email) {
    return await UserModel.findOne({ email }).lean();
  }

  async createUser(userData) {
    const exists = await UserModel.findOne({ email: userData.email });
    if (exists) throw new Error('Ya existe un usuario con ese email.');
    const created = await UserModel.create(userData);
    return created.toObject ? created.toObject() : created;
  }

  async updateUser(id, updatedData) {
    const updated = await UserModel.findByIdAndUpdate(id, updatedData, { new: true }).lean();
    return updated || null;
  }

  async deleteUser(id) {
    const deleted = await UserModel.findByIdAndDelete(id).lean();
    return deleted || null;
  }
}
