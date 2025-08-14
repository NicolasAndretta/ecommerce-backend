// src/utils/tokenGenerator.js
import crypto from 'crypto';

export function generateResetToken() {
    // Generate a secure random token for password reset
  return crypto.randomBytes(32).toString('hex');
}
