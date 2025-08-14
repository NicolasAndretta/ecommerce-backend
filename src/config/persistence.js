// src/config/persistence.js
import { envConfig } from './env.js';

let productService;
let cartService;
let userService;

switch (envConfig.PERSISTENCE) {
  case 'mongodb':
    console.log('🟣 Usando persistencia con MongoDB');
    const { connectDB } = await import('./dbConnection.js');
    await connectDB();

    const { MongoProductManager } = await import('../dao/filesystem/mongodb/managers/MongoProductManager.js');
    const { MongoCartManager } = await import('../dao/filesystem/mongodb/managers/MongoCartManager.js');
    const { MongoUserManager } = await import('../dao/filesystem/mongodb/managers/MongoUserManager.js');
    const { MongoTicketManager } = await import('../dao/filesystem/mongodb/managers/MongoTicketManager.js');
    productService = new MongoProductManager();
    cartService = null; 
    userService = null; 
    break;

  default:
    console.log('🟡 Usando persistencia con FileSystem');
    const { default: FSProductManager } = await import('../dao/filesystem/managers/FSProductManager.js');
    const { default: FSCartManager } = await import('../dao/filesystem/managers/FSCartManager.js');
    const { default: FSUserManager } = await import('../dao/filesystem/managers/FSUserManager.js');

    productService = new FSProductManager();
    cartService = new FSCartManager();
    userService = new FSUserManager();
    break;
}

export { productService, cartService, userService };
