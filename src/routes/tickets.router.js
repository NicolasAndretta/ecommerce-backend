// src/routes/tickets.router.js
import { Router } from 'express';
import * as ctrl from '../controllers/ticket.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/:tid', authenticateJWT, ctrl.getTicketById);

export default router;
