const express = require("express");
const router = express.Router();

// middleware
const { userValidateJWT } = require("../middlewares/AuthMiddleware");

const {
  register,
  login,
  profile,
} = require("../controllers/Users");

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/profile", userValidateJWT, profile);


module.exports = router;
