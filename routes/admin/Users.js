const express = require("express");
const router = express.Router();

const { adminValidateJWT } = require("../../middlewares/AuthMiddleware")
const { getUsers } = require("../../controllers/admin/Users");

router.get("/", adminValidateJWT, getUsers);

module.exports = router;
