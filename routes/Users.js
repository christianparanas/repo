const express = require("express");
const router = express.Router();

// middleware
const { userValidateJWT } = require("../middlewares/AuthMiddleware");

const {
  register,
  login,
  profile,
  userUpdateDetails,
  forgotpassword,
  resetpassword
} = require("../controllers/Users");

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/forgotpassword", forgotpassword);
router.get("/auth/resetpassword/:resetToken", resetpassword);
router.get("/profile", userValidateJWT, profile);

router.patch("/updatedetails", userValidateJWT, userUpdateDetails);


module.exports = router;
