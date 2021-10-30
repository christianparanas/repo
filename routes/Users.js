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

router.post("/register", register);
router.post("/login", login);

router.get("/profile", validateJWT, profile);


// admin
router.post("/admin/register", adminRegister);
router.post("/admin/login", adminLogin);

module.exports = router;
