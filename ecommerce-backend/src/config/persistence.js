// src/config/persistence.js
import { envConfig } from './env.js';

let productService;
let cartService;
let userService;

switch (envConfig.PERSISTENCE) {
  case 'mongodb':
    console.log('🧩 Usando persistencia con MongoDB');
    // Luego implementarás estos managers
    const { default: MongoProductManager } = await import('../dao/mongodb/managers/ProductManager.js');
    const { default: MongoCartManager } = await import('../dao/mongodb/managers/CartManager.js');
    const { default: MongoUserManager } = await import('../dao/mongodb/managers/UserManager.js');
    productService = new MongoProductManager();
    cartService = new MongoCartManager();
    userService = new MongoUserManager();
    break;

  case 'fs':
  default:
    console.log('📁 Usando persistencia con FileSystem');
    const { default: FSProductManager } = await import('../dao/filesystem/managers/FSProductManager.js');
    const { default: FSCartManager } = await import('../dao/filesystem/managers/FSCartManager.js');
    const { default: FSUserManager } = await import('../dao/filesystem/managers/FSUserManager.js');
    productService = new FSProductManager();
    cartService = new FSCartManager();
    userService = new FSUserManager();
    break;
}

export { productService, cartService, userService };
