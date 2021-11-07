const express = require("express");
const router = express.Router();

const { adminValidateJWT } = require("../../middlewares/AuthMiddleware")
const { getProducts } = require("../../controllers/admin/Products")

router.get("/", adminValidateJWT, getProducts)

module.exports = router