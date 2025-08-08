// src/controllers/product.controller.js

// Obtener todos los productos con paginación, orden y filtrado
export const getAllProducts = async (req, res, productService) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort === 'asc' ? 1 : req.query.sort === 'desc' ? -1 : null;
    const query = req.query.category ? { category: req.query.category } : {};

    const result = await productService.getProducts(limit, page, sort, query);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos', details: err.message });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res, productService) => {
  try {
    const product = await productService.getProductById(req.params.pid);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el producto', details: err.message });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res, productService) => {
  try {
    const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({ error: `Faltan campos obligatorios: ${missingFields.join(', ')}` });
    }

    const newProduct = await productService.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear el producto', details: err.message });
  }
};

// Actualizar un producto existente
export const updateProduct = async (req, res, productService) => {
  try {
    const updatedProduct = await productService.updateProduct(req.params.pid, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado para actualizar' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar el producto', details: err.message });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res, productService) => {
  try {
    const deleted = await productService.deleteProduct(req.params.pid);
    if (!deleted) {
      return res.status(404).json({ error: 'Producto no encontrado para eliminar' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto', details: err.message });
  }
};
