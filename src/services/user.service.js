// src/services/user.service.js
import UserRepository from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateResetToken } from '../utils/tokenGenerator.js';
import { sendMail } from '../utils/mailer.js';
import { envConfig } from '../config/env.js';

const repo = new UserRepository();

export default class UserService {
  async createUser(userData) {
    // hash password
    const toSave = { ...userData, password: hashPassword(userData.password) };
    return repo.create(toSave);
  }

  async getUserByEmail(email) {
    return repo.getByEmail(email);
  }

  async getUserById(id) {
    return repo.getById(id);
  }

  async requestPasswordReset(email, originUrl) {
    const user = await repo.getByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');
    const token = generateResetToken();
    const expires = Date.now() + msToMs(envConfig.PASSWORD_RESET_EXPIRES);
    // Update user with reset token and expiration
    await repo.update(user.id || user._id, { resetToken: token, resetExpires: expires });

    const resetLink = `${originUrl}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    const html = `<p>Click para resetear la contraseña (1 hora): <a href="${resetLink}">Reset password</a></p>`;
    await sendMail({ to: email, subject: 'Password reset', html });
    return true;
  }

  async resetPassword(email, token, newPassword) {
    const user = await repo.getByEmail(email);
    if (!user) throw new Error('Usuario no encontrado');
    if (!user.resetToken || user.resetToken !== token) throw new Error('Token inválido');
    if (Date.now() > user.resetExpires) throw new Error('Token expirado');
    if (comparePassword(newPassword, user.password)) throw new Error('Nueva contraseña no puede ser igual a la anterior');
    const hashed = hashPassword(newPassword);
    await repo.update(user.id || user._id, { password: hashed, resetToken: null, resetExpires: null });
    return true;
  }
}

function msToMs(str) {
  // accepts '1h', '24h', '60m' etc
  if (!str) return 3600000;
  if (str.endsWith('h')) return Number(str.slice(0,-1)) * 3600000;
  if (str.endsWith('m')) return Number(str.slice(0,-1)) * 60000;
  return Number(str) || 3600000;
}
