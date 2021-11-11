const express = require("express");
const router = express.Router();

const { getCheckoutItemsData, placeOrder } = require("../controllers/Orders");

router.post("/", placeOrder)

router.post("/itemsdetails", getCheckoutItemsData);

module.exports = router;
