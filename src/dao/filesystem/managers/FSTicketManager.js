//src/dao/filesystem/managers/FSTicketManager.js

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TICKETS_PATH = path.resolve(__dirname, '../../data/tickets.json'); // ajusta si tu carpeta data está en otra ruta

async function readFile() {
  try {
    const raw = await fs.readFile(TICKETS_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
async function writeFile(data) {
  await fs.writeFile(TICKETS_PATH, JSON.stringify(data, null, 2));
}

export default class FSTicketManager {
  constructor(filePath = TICKETS_PATH) {
    this.path = filePath;
  }

  async createTicket({ code, amount, purchaser, products = [] }) {
    const tickets = await readFile();
    const newTicket = {
      id: crypto.randomUUID(),
      code,
      purchase_datetime: new Date().toISOString(),
      amount,
      purchaser,
      products
    };
    tickets.push(newTicket);
    await writeFile(tickets);
    return newTicket;
  }

  async getTickets() {
    return await readFile();
  }

  async getTicketById(id) {
    const tickets = await readFile();
    return tickets.find(t => t.id === id) || null;
  }
}
