const express = require("express");
const router = express.Router();

// middlewares
const { userValidateJWT } = require("../middlewares/AuthMiddleware");

const {
  addToCart,
  removeFromCart,
  getCartItems,
  reduceQtyCartItem,
  increaseQtyCartItem,
} = require("../controllers/Carts");

router.get("/", userValidateJWT, getCartItems);
router.post("/", userValidateJWT, addToCart);
router.delete("/:cartId", userValidateJWT, removeFromCart);
router.post("/inc", userValidateJWT, increaseQtyCartItem);
router.post("/dec", userValidateJWT, reduceQtyCartItem);

module.exports = router;
