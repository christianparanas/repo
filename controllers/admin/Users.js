const { Op } = require("sequelize");
const db = require("../../models");

exports.getUsers = async (req, res) => {
  
  db.Users.findAll({
    attributes: {
      exclude: ["password"]
    }
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
}