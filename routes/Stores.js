const express = require("express");
const router = express.Router();

// middlewares
const { userValidateJWT } = require("../middlewares/AuthMiddleware");

// controllers
const {
  getStores,
  getUserStoreData,
  getStoreData,
  userStoreUpdateDetails,
} = require("../controllers/Stores");

// public routes
router.get('/', getStores)
router.get("/store/:storeId", getStoreData);

// protected routes
router.get("/userstore", userValidateJWT, getUserStoreData);
router.patch("/updateDetails", userValidateJWT, userStoreUpdateDetails);

module.exports = router;
