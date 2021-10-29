const express = require("express");
const router = express.Router()

// controller
const { getAllProducts, searchProduct, updateProduct, deleteProduct } = require('../controllers/Products')

// middleware
const { validateJWT } = require('../middlewares/AuthMiddleware')

// get all products
router.get('/', getAllProducts)

// get single products
router.get('/:id', searchProduct)

// update product
router.patch('/:id', validateJWT, updateProduct)

// delete product
router.delete('/:id', validateJWT, deleteProduct)

module.exports = router
