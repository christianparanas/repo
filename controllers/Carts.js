const { sign, verify } = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../models");

const { decodeJWT, getStoreId } = require("../utils/func");

exports.getCartItems = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  db.Carts.findAll({ where: { UserId: decodedJwt.id }, include: [db.Products] })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.json(error);
    });
};

exports.addToCart = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  // check if product alrealdy in the cart
  const isAlreadyInCart = await db.Carts.findOne({
    where: {
      [Op.and]: [{ ProductId: req.body.product_id }, { UserId: decodedJwt.id }],
    },
  }).then((count) => {
    return count == null ? false : true;
  });

  if (!isAlreadyInCart) {
    db.Carts.create({
      quantity: req.body.product_quantity,
      ProductId: req.body.product_id,
      UserId: decodedJwt.id,
    })
      .then((response) => {
        res.status(201).json({ message: "Added to cart" });
      })
      .catch((error) => {
        res.json(error);
      });
  } else {
    res.status(403).json({ message: "Item already in the cart" });
  }
};

exports.removeFromCart = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  db.Carts.destroy({
    where: {
      [Op.and]: [{ id: req.params.cartId }, { UserId: decodedJwt.id }],
    },
  })
    .then((response) => {
      res.status(200).json({ message: "Cart item removed" });
    })
    .catch((error) => {
      res.json(error);
    });
};

exports.reduceQtyCartItem = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  db.Carts.findOne({
    where: {
      [Op.and]: [{ id: req.body.cartId }, { UserId: decodedJwt.id }],
    },
  })
  .then(response => {
    return response.decrement('quantity')
  }) 
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
}

exports.increaseQtyCartItem = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  db.Carts.findOne({
    where: {
      [Op.and]: [{ id: req.body.cartId }, { UserId: decodedJwt.id }],
    },
  })
  .then(response => {
    return response.increment('quantity')
  }) 
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.json(error)
  })
}
