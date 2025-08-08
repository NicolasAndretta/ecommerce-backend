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
    // TODO: importar los otros managers cuando los tengas
    productService = new MongoProductManager();
    cartService = null; // actualizar cuando tengas MongoCartManager
    userService = null; // actualizar cuando tengas MongoUserManager
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
