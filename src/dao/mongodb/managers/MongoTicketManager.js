// src/dao/mongodb/managers/MongoTicketManager.js
import TicketModel from '../models/ticket.model.js';

export default class MongoTicketManager {
  async createTicket(ticketData) {
    const t = await TicketModel.create(ticketData);
    return t.toObject ? t.toObject() : t;
  }

  async getTicketById(id) {
    return await TicketModel.findById(id).lean();
  }
}
