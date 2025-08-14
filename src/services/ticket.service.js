// src/services/ticket.service.js
import TicketRepository from '../repositories/ticket.repository.js';
const repo = new TicketRepository();

export default class TicketService {
  async create(ticket) { return repo.create(ticket); }
  async getById(id) { return repo.getById(id); }
}
