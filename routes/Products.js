const express = require("express");
const router = express.Router();

// controllers
const {
  getAllProducts,
  searchProduct,
  addProduct,
  getProduct,
  newProducts,
  discoverProducts,
} = require("../controllers/Products");

// middlewares
const { userValidateJWT } = require("../middlewares/AuthMiddleware");

// public routes
router.get("/", getAllProducts);
router.get("/new", newProducts);
router.get("/discover", discoverProducts);
router.get("/search/:query", searchProduct);
router.get("/:product_id", getProduct);

// protected routes
router.post("/", userValidateJWT, addProduct);

module.exports = router;
