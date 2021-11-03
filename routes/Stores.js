const express = require("express");
const router = express.Router();

// middlewares
const { validateJWT } = require("../middlewares/AuthMiddleware");

// controllers
const {
  getUserStoreData,
  getStoreData,
  userStoreUpdateDetails,
} = require("../controllers/Stores");

// public routes
router.get("/store/:storeId", getStoreData);

// protected routes
router.get("/userstore", validateJWT, getUserStoreData);
router.patch("/updateDetails", validateJWT, userStoreUpdateDetails);

module.exports = router;
