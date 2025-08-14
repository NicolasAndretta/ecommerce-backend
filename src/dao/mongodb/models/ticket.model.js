// src/dao/mongodb/models/ticket.model.js
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true }, // purchaser email
}, { timestamps: true });

const TicketModel = mongoose.model('Ticket', ticketSchema);
export default TicketModel;
