const { sign, verify } = require("jsonwebtoken");
const db = require("../models");

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

// get storeId by current user id
exports.getStoreId = async (decodedJwtId) => {
  const storeId = await db.Stores.findOne({
    where: {
      UserId: decodedJwtId || "thea",
    },
  })
    .then((data) => {
      return data ? data.dataValues.id : 'taba' ;
    })
    .catch((error) => {
      console.log(error);
    });

  return storeId
}