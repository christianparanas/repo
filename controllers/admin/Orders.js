const { Op } = require("sequelize");
const db = require("../../models");

exports.getOrders = async (req, res) => {
  db.Orders.findAll({ include: [db.Users] })
  .then((response) => {
    res.status(200).json(response);
  })
  .catch((err) => {
    res.json(err);
  });
}