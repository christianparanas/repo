const express = require("express");
const router = express.Router();

const { getUsers } = require("../../controllers/admin/Users");

router.get("/", getUsers);

module.exports = router;
