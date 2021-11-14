const express = require("express");
const router = express.Router();

const { placeOrder, getOrders } = require("../controllers/Orders");

// middlewares
const { userValidateJWT } = require("../middlewares/AuthMiddleware");

router.get("/", userValidateJWT, getOrders)
router.post("/", userValidateJWT, placeOrder)


module.exports = router;
