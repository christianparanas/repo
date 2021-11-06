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
const { userValidateJWT } = require("../middlewares/AuthMiddleware");

// public routes
router.get("/", getAllProducts);
router.get("/search/:query", searchProduct)
router.get("/:product_id", getProduct)

// protected routes
router.post('/', userValidateJWT, addProduct)
router.patch("/:id", userValidateJWT, updateProduct);
router.delete("/:id", userValidateJWT, deleteProduct);


module.exports = router;
