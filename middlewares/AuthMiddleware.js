const { verify } = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const uJwtToken = req.header("uJwtToken");

  if (!uJwtToken) res.status(401).json("Unathorized!");

  try {
    const validatedToken = verify(uJwtToken, process.env.JWT_SECRET);

    if (validatedToken) return next();
  } catch (err) {
    return res.status(401);
  }
};

module.exports = { validateJWT };
