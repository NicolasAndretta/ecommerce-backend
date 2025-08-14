// src/dao/factory.js
import config from '../config/config.js';

let ProductManager, CartManager, UserManager, TicketManager;

if (config.persistence === 'mongodb') {
  ({ default: ProductManager } = await import('./mongodb/managers/MongoProductManager.js'));
  ({ default: CartManager } = await import('./mongodb/managers/MongoCartManager.js'));
  ({ default: UserManager } = await import('./mongodb/managers/MongoUserManager.js'));
  ({ default: TicketManager } = await import('./mongodb/managers/MongoTicketManager.js'));
} else {
  ({ default: ProductManager } = await import('./filesystem/managers/FSProductManager.js'));
  ({ default: CartManager } = await import('./filesystem/managers/FSCartManager.js'));
  ({ default: UserManager } = await import('./filesystem/managers/FSUserManager.js'));
  ({ default: TicketManager } = await import('./filesystem/managers/FSTicketManager.js').catch(()=>({ default: null })));
}

export { ProductManager, CartManager, UserManager, TicketManager };
