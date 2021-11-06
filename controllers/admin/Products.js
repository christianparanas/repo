const { Op } = require("sequelize");
const db = require("../../models");

exports.getProducts = async (req, res) => {
  
  db.Products.findAll()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
}
