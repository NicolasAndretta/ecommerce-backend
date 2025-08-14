//src/dao/mongodb/models/user.model.js

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }
}, {
  timestamps: true
});

// plugin de paginación
userSchema.plugin(mongoosePaginate);

const UserModel = mongoose.model('User', userSchema);
export default UserModel;
