const { sign, verify } = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../models");

const { decodeJWT, getStoreId } = require("../utils/func")

const getAllProducts = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  // get store id by user id from interceptor
  const storeId = await getStoreId(decodedJwt.id)

  db.Products.findAll({
    where: {
      StoreId: {
        [Op.ne]: storeId,
      },
    }
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
};

const getProduct = (req, res) => {
  const product_id = req.params.product_id;

  db.Products.findByPk(product_id, {
    include: [db.Stores],
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
};

const addProduct = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  // retrive store id by user id
  db.Stores.findOne({ where: { UserId: decodedJwt.id } })
    .then((data) => {
      // store products details with storeId that got from above code
      try {
        db.Products.create({
          StoreId: data.dataValues.id,
          ...req.body,
        });

        return res.status(201).json({ message: "Product saved!" });
      } catch (err) {
        return res.json({ err });
      }
    })
    .catch((err) => {
      return res.json(err);
    });
};

const searchProduct = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  // get store id by user id from interceptor
  const storeId = await getStoreId(decodedJwt.id)

  db.Products.findAll({
    where: {
      [Op.and]: [
        {
          // filter search result - exclude, current user store products
          StoreId: {
            [Op.ne]: storeId,
          },
        },
        {
          [Op.or]: [
            {
              product_name: {
                [Op.like]: `%${req.params.query}%`,
              },
            },
            {
              product_description: {
                [Op.like]: `%${req.params.query}%`,
              },
            },
          ],
        },
      ],
    },
  })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json(error);
    });
};

const updateProduct = (req, res) => {
  res.json(req.params.id);
};

const deleteProduct = (req, res) => {
  res.json(req.params.id);
};

module.exports = {
  getAllProducts,
  searchProduct,
  updateProduct,
  deleteProduct,
  addProduct,
  getProduct,
};
