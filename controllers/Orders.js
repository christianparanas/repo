const { sign, verify } = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../models");

const { decodeJWT, getStoreId } = require("../utils/func");

exports.getCheckoutItemsData = (req, res) => {
  console.log(req.body);

  res.json(req.body);
};
