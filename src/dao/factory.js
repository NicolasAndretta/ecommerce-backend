// src/dao/factory.js
import config from '../config/config.js';

let ProductManager;
let CartManager;
let UserManager;
let TicketManager;

switch ((config.persistence || '').toLowerCase()) {
  case 'mongodb':
    console.log('👉 Usando persistencia con MongoDB');
    ({ default: ProductManager } = await import('./mongodb/managers/MongoProductManager.js'));
    ({ default: CartManager } = await import('./mongodb/managers/MongoCartManager.js'));
    ({ default: UserManager } = await import('./mongodb/managers/MongoUserManager.js'));
    try {
      ({ default: TicketManager } = await import('./mongodb/managers/MongoTicketManager.js'));
    } catch(e) { TicketManager = null; }
    break;

  case 'filesystem':
  default:
    console.log('👉 Usando persistencia con FileSystem');
    ({ default: ProductManager } = await import('./filesystem/managers/FSProductManager.js'));
    ({ default: CartManager } = await import('./filesystem/managers/FSCartManager.js'));
    ({ default: UserManager } = await import('./filesystem/managers/FSUserManager.js'));
    try {
      ({ default: TicketManager } = await import('./filesystem/managers/FSTicketManager.js'));
    } catch(e) { TicketManager = null; }
    break;
}

export { ProductManager, CartManager, UserManager, TicketManager };
