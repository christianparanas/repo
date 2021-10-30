const express = require("express");
const router = express.Router();

// middleware
const { validateJWT } = require("../middlewares/AuthMiddleware");

const {
  register,
  login,
  adminRegister,
  adminLogin,
  profile,
} = require("../controllers/Users");

router.post("/auth/register", register);
router.post("/auth/login", login);

router.get("/profile", validateJWT, profile);


// admin
router.post("/admin/auth/register", adminRegister);
router.post("/admin/auth/login", adminLogin);

module.exports = router;
