const { sign, verify } = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../models");

const { decodeJWT, getStoreId } = require("../utils/func");

exports.getStores = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  // get store id by user id from interceptor
  const storeId = await getStoreId(decodedJwt.id);

  db.Stores.findAll({
    where: {
      id: {
        [Op.ne]: storeId,
      },
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getUserStoreData = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  db.Stores.findOne({
    where: { UserId: decodedJwt.id },
    include: [db.Products],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.getStoreData = async (req, res) => {
  const storeId = req.params.storeId;

  db.Stores.findOne({
    where: { id: storeId },
    include: [
      {
        model: db.Products,
        where: {
          product_quantity: {
            [Op.ne]: 0,
          },
        },
      },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.userStoreUpdateDetails = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  db.Stores.update(
    {
      ...req.body,
    },
    { where: { UserId: decodedJwt.id } }
  )
    .then((response) => {
      res.status(200).json("Updated!");
    })
    .catch((err) => {
      res.json(err);
    });
};
