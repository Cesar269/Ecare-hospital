const express = require('express');
const path = require('path');

const ProductsService = require('../services/productsService');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  try{
    const products = await service.find();
    res.status(200).json(
      products
    );
  }catch(error) {
    res.status(404).json({
      message: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(200).json({
      product
    });
  }catch(error) {
    res.status(404).json({
      message: error.message
    });
  }
});

// Eliminar producto
router.delete('/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const result = await service.delete(id);
    res.status(200).json({
      message: "Producto eliminado",
      id
    });
  }catch(error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
