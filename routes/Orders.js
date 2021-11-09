const express = require("express");
const router = express.Router();

const { getCheckoutItemsData } = require("../controllers/Orders");

router.post("/itemsdetails", getCheckoutItemsData);

module.exports = router;
