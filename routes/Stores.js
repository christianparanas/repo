const express = require("express");
const router = express.Router();

// middleware
const { validateJWT } = require("../middlewares/AuthMiddleware");

const { getAllProducts, updateStoreDetails } = require("../controllers/Stores")

router.get('/products', validateJWT, getAllProducts)

router.patch('/updateDetails', validateJWT, updateStoreDetails)


module.exports =  router