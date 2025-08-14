// src/controllers/ticket.controller.js
import TicketService from '../services/ticket.service.js';
const svc = new TicketService();

export const getTicketById = async (req, res) => {
  try {
    const t = await svc.getById(req.params.tid);
    if (!t) return res.status(404).json({ error:'Not found' });
    res.json({ status:'success', data: t });
  } catch (err) { res.status(500).json({ error: err.message }); }
};
