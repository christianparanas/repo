const express = require("express");
const router = express.Router();

// controller
const {
  getAllProducts,
  searchProduct,
  updateProduct,
  deleteProduct,
  addProduct
} = require("../controllers/Products");

// middleware
const { validateJWT } = require("../middlewares/AuthMiddleware");

// get all products
router.get("/", getAllProducts);

// get single products
router.get("/:query", searchProduct);

router.post('/', validateJWT, addProduct)

// update product
router.patch("/:id", validateJWT, updateProduct);

// delete product
router.delete("/:id", validateJWT, deleteProduct);


module.exports = router;
