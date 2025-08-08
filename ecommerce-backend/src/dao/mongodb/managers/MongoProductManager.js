import ProductModel from '../models/product.model.js';

export default class MongoProductManager {
  async getProducts(limit = 10, page = 1, sort = null, query = {}) {
    // Si el modelo tiene paginate, lo usamos, sino simulamos
    if (typeof ProductModel.paginate === 'function') {
      const options = { limit, page, sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}, lean: true };
      return await ProductModel.paginate(query, options);
    } else {
      const skip = (page - 1) * limit;
      const cursor = ProductModel.find(query).skip(skip).limit(limit);
      if (sort === 'asc') cursor.sort({ price: 1 });
      else if (sort === 'desc') cursor.sort({ price: -1 });
      const docs = await cursor.lean();
      const totalDocs = await ProductModel.countDocuments(query);
      return {
        docs,
        totalDocs,
        limit,
        totalPages: Math.ceil(totalDocs / limit) || 1,
        page,
        hasPrevPage: page > 1,
        hasNextPage: skip + limit < totalDocs,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: skip + limit < totalDocs ? page + 1 : null
      };
    }
  }

  async getProductById(id) {
    const product = await ProductModel.findById(id).lean();
    if (!product) return null;
    return product;
  }

  async addProduct(productData) {
    const existing = await ProductModel.findOne({ code: productData.code });
    if (existing) throw new Error('Ya existe un producto con ese código.');
    const created = await ProductModel.create(productData);
    return created.toObject ? created.toObject() : created;
  }

  async updateProduct(id, updatedData) {
    const updated = await ProductModel.findByIdAndUpdate(id, updatedData, { new: true }).lean();
    if (!updated) throw new Error('Producto no encontrado para actualizar.');
    return updated;
  }

  async deleteProduct(id) {
    const deleted = await ProductModel.findByIdAndDelete(id).lean();
    if (!deleted) throw new Error('Producto no encontrado para eliminar.');
    return deleted;
  }
}
