const express = require("express");
const router = express.Router();

// controllers
const {
  getAllProducts,
  searchProduct,
  updateProduct,
  deleteProduct,
  addProduct,
  getProduct
} = require("../controllers/Products");

// middlewares
const { validateJWT } = require("../middlewares/AuthMiddleware");

// public routes
router.get("/", getAllProducts);
router.get("/search/:query", searchProduct)
router.get("/:product_id", getProduct)

// protected routes
router.post('/', validateJWT, addProduct)
router.patch("/:id", validateJWT, updateProduct);
router.delete("/:id", validateJWT, deleteProduct);


module.exports = router;
