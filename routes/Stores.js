const express = require("express");
const router = express.Router();

// middleware
const { validateJWT } = require("../middlewares/AuthMiddleware");

const { getAllProducts } = require("../controllers/Stores")

router.get('/', validateJWT, getAllProducts)


module.exports =  router