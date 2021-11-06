const express = require("express");
const router = express.Router();

// middlewares
const { validateJWT } = require("../middlewares/AuthMiddleware");

const {
  addToCart,
  removeFromCart,
  getCartItems,
  reduceQtyCartItem,
  increaseQtyCartItem,
} = require("../controllers/Carts");

router.get("/", validateJWT, getCartItems);
router.post("/", validateJWT, addToCart);
router.delete("/:cartId", validateJWT, removeFromCart);
router.post("/inc", validateJWT, increaseQtyCartItem);
router.post("/dec", validateJWT, reduceQtyCartItem);

module.exports = router;
