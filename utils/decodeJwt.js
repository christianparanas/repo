const { sign, verify } = require("jsonwebtoken");

exports.decodeJWT = async (token) => {
  let result;

  if (token == "chand") {
    result = false;
  } else {
    const decodedJwt = await verify(token, process.env.JWT_SECRET);
    if (!decodedJwt) return res.json(decodedJwt);

    result = decodedJwt;
  }

  return result;
};