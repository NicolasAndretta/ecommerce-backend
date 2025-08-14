// src/dao/filesystem/managers/FSBaseManager.js
import fs from 'fs/promises';

export default class FSBaseManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async _readFile() {
    try {
      const raw = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }
}
