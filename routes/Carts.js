const express = require("express");
const router = express.Router();

// middlewares
const { validateJWT } = require("../middlewares/AuthMiddleware");

const { addToCart, removeFromCart, getCartItems } = require("../controllers/Carts");

router.get('/', validateJWT, getCartItems)
router.post("/", validateJWT, addToCart);
router.delete("/", validateJWT, removeFromCart);

module.exports = router;
