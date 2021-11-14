const express = require("express");
const router = express.Router();

const { adminValidateJWT } = require("../../middlewares/AuthMiddleware");
const { getOrders } = require("../../controllers/admin/Orders");

router.get("/", adminValidateJWT, getOrders);

module.exports = router;
