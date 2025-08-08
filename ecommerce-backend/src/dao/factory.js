// src/dao/factory.js
import { persistence } from '../config/env.js';

let ProductManager;
let CartManager;
let UserManager;

switch (persistence) {
  case 'mongodb':
    console.log('👉 Usando persistencia con MongoDB');
    // ✅ Ajustamos rutas para tu estructura actual
    const { default: MongoProductManager } = await import('./mongodb/managers/MongoProductManager.js');
    const { default: MongoCartManager } = await import('./mongodb/managers/MongoCartManager.js');
    const { default: MongoUserManager } = await import('./mongodb/managers/MongoUserManager.js');
    ProductManager = MongoProductManager;
    CartManager = MongoCartManager;
    UserManager = MongoUserManager;
    break;

  case 'filesystem':
  default:
    console.log('👉 Usando persistencia con FileSystem');
    // ✅ Ajustamos rutas para tu estructura actual
    const { default: FSProductManager } = await import('./filesystem/managers/FSProductManager.js');
    const { default: FSCartManager } = await import('./filesystem/managers/FSCartManager.js');
    const { default: FSUserManager } = await import('./filesystem/managers/FSUserManager.js');
    ProductManager = FSProductManager;
    CartManager = FSCartManager;
    UserManager = FSUserManager;
    break;
}

export { ProductManager, CartManager, UserManager };
