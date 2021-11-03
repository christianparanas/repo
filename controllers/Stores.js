const { sign, verify } = require("jsonwebtoken");
const db = require("../models");

exports.getAllProducts = async (req, res) => {
  const uJwtToken = req.header("uJwtToken");

  const decodedJwt = await verify(uJwtToken, process.env.JWT_SECRET);
  if (!decodedJwt) return res.json(decodedJwt);

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


