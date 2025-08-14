// src/controllers/user.controller.js
import UserService from '../services/user.service.js';
import { toUserDTO } from '../dtos/user.dto.js';

const svc = new UserService();

export const createUser = async (req, res) => {
  try {
    const u = await svc.createUser(req.body);
    res.status(201).json({ status:'success', user: toUserDTO(u) });
  } catch (err) { res.status(400).json({ status:'error', message: err.message }); }
};

export const getUserByEmail = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error:'Email required' });
  try {
    const u = await svc.getUserByEmail(email);
    if (!u) return res.status(404).json({ error:'Not found' });
    res.json({ status:'success', user: toUserDTO(u) });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

export const getCurrentUser = async (req, res) => {
  try {
    const id = req.user?.id || req.user?._id || req.user?.sub;
    if (!id) return res.status(400).json({ error:'No id in token' });
    const u = await svc.getUserById(id);
    if (!u) return res.status(404).json({ error:'Not found' });
    res.json({ status:'success', user: toUserDTO(u) });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

// Password reset endpoints:
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });
  try {
    const origin = req.headers.origin || `${req.protocol}://${req.get('host')}`;
    await svc.requestPasswordReset(email, origin);
    res.json({ status: 'success', message: 'Password reset email sent' });
  } catch (err) { res.status(400).json({ error: err.message }); }
};

export const resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  if (!email || !token || !newPassword) return res.status(400).json({ error: 'Missing fields' });
  try {
    await svc.resetPassword(email, token, newPassword);
    res.json({ status: 'success', message: 'Password updated' });
  } catch (err) { res.status(400).json({ error: err.message }); }
};
