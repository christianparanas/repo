const { sign, verify } = require("jsonwebtoken");
const db = require("../models");

const getAllProducts = (req, res) => {
  db.Products.findAll().then((response) => {
    res.status(200).json(response);
  })
  .catch(err => {
    res.json(err)
  })
};

const getProduct = (req, res) => {
  const product_id = req.params.product_id

  db.Products.findByPk(product_id, {
    include: [db.Stores]
  }).then((response) => {
    res.status(200).json(response)
  })
  .catch((err) => {
    res.json(err)
  })
}

const searchProduct = (req, res) => {
  res.json(req.params.query);
};

const addProduct = async (req, res) => {
  // get jwt from headers, that has been passed by the interceptor
  const uJwtToken = req.header("uJwtToken");

  // verify and decode the jwt to get the user id, the user id is needed to continue the process below
  const decodedJwt = await verify(uJwtToken, process.env.JWT_SECRET);
  if (!decodedJwt) return res.json(decodedJwt);

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
  getProduct
};
