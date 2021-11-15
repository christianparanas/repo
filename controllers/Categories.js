const { Op } = require("sequelize");

const { decodeJWT, getStoreId } = require("../utils/func");
const db = require("../models");

exports.getCategories = async (req, res) => {
  db.Categories.findAll()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
};

exports.getCategoryProducts = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));
  const storeId = await getStoreId(decodedJwt.id);

  db.Categories.findOne({
    where: {
      name: req.params.category,
    },
    include: [
      {
        model: db.Products,
        where: {
          StoreId: {
            [Op.ne]: storeId,
          },
        },
      },
    ],
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
};
