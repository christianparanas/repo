const { sign, verify } = require("jsonwebtoken");
const db = require("../models");

const { decodeJWT } = require('../utils/func')

exports.getAllStores = (req, res) => {
  db.Stores.findAll()
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.json(err)
    })
}

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
  const storeId = req.params.storeId

  db.Stores.findOne({
    where: { id: storeId },
    include: [db.Products],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.userStoreUpdateDetails =  async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  db.Stores.update(
    {
      ...req.body
    },
    { where: { UserId: decodedJwt.id } }
  )
  .then(response => {
    res.status(200).json("Updated!")
  })
  .catch(err => {
    res.json(err)
  })
}


