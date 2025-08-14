// src/routes/users.router.js
import { Router } from 'express';
import * as ctrl from '../controllers/user.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', ctrl.createUser);
router.get('/', ctrl.getUserByEmail);
router.get('/current', authenticateJWT, ctrl.getCurrentUser);
router.post('/request-reset', ctrl.requestPasswordReset);
router.post('/reset-password', ctrl.resetPassword);

export default router;
