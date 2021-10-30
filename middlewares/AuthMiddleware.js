// model
const { Users } = require("../models");

const { verify } = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const uJwtToken = req.header("uJwtToken");

  console.log(req.header("uJwtToken"))

  if (!uJwtToken) res.status(403).json("No token provided!");

  try {
    const validatedToken = verify(uJwtToken, process.env.JWT_SECRET);

    if (validatedToken) return next();
  } catch (err) {
    return res.status(401).json("Unauthorized!");
  }
};

module.exports = { validateJWT };
