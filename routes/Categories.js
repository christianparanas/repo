const express = require("express");
const router = express.Router();

const { getCategories, getCategoryProducts } = require('../controllers/Categories')

router.get("/", getCategories)
router.get("/:category", getCategoryProducts)

module.exports = router;