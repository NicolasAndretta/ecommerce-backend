// src/dtos/user.dto.js
export const toUserDTO = (user) => {
  if (!user) return null;
  return {
    id: user.id || user._id,
    first_name: user.first_name || user.firstName || null,
    last_name: user.last_name || user.lastName || null,
    email: user.email,
    role: user.role || 'user',
    cart: user.cart || null,
    createdAt: user.createdAt || user.created_at || null,
    updatedAt: user.updatedAt || user.updated_at || null
  };
};
