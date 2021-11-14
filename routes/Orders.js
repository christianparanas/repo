const express = require("express");
const router = express.Router();

const { placeOrder, getOrders } = require("../controllers/Orders");

router.get("/", getOrders)
router.post("/", placeOrder)


module.exports = router;
