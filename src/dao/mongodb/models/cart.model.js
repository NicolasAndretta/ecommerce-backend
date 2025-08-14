//src/dao/mongodb/models/cart.model.js

import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1
    }
  }]
}, {
  timestamps: true
});

// plugin para paginación
cartSchema.plugin(mongoosePaginate);

const CartModel = mongoose.model('Cart', cartSchema);
export default CartModel;
