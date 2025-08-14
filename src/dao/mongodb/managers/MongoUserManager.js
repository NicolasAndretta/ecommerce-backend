// src/dao/mongodb/managers/MongoUserManager.js
import UserModel from '../models/user.model.js';

export default class MongoUserManager {
  async getUsers(limit = 10, page = 1, query = {}) {
    if (typeof UserModel.paginate === 'function') {
      return await UserModel.paginate(query, { limit, page, lean: true });
    } else {
      const skip = (page - 1) * limit;
      const docs = await UserModel.find(query).skip(skip).limit(limit).lean();
      const totalDocs = await UserModel.countDocuments(query);
      return {
        docs,
        totalDocs,
        limit,
        totalPages: Math.max(1, Math.ceil(totalDocs / limit)),
        page,
        hasPrevPage: page > 1,
        hasNextPage: skip + limit < totalDocs,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: skip + limit < totalDocs ? page + 1 : null
      };
    }
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
