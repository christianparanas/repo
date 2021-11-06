const express = require("express");
const router = express.Router();

const { getProducts } = require("../../controllers/admin/Products")


router.get("/", getProducts)



module.exports = router