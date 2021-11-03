const express = require("express");
const router = express.Router();

// middlewares
const { validateJWT } = require("../middlewares/AuthMiddleware");

// controllers
const { getAllProducts, updateStoreDetails } = require("../controllers/Stores");

router.get("/products", validateJWT, getAllProducts);
router.patch("/updateDetails", validateJWT, updateStoreDetails);

module.exports = router;
