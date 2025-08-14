// src/repositories/ticket.repository.js
import { TicketManager } from '../dao/factory.js';
const ticketDao = TicketManager ? new TicketManager() : null;

export default class TicketRepository {
  async create(ticket) { if(!ticketDao) throw new Error('No ticket persistence configured'); return ticketDao.createTicket(ticket); }
  async getById(id) { if(!ticketDao) return null; return ticketDao.getTicketById(id); }
}
