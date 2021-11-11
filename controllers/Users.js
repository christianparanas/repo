const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const { decodeJWT } = require('../utils/func')

// model
const db = require("../models");

exports.register = async (req, res) => {
  const { name, email, address, password } = req.body;

  bcrypt.hash(password, 10).then(async (hashedPassword) => {
    try {
      // store user data
      const user = await db.Users.create({
        name: name,
        email: email,
        address: address,
        password: hashedPassword,
        role: "user",
      });

      // create store for the user
      const store = await db.Stores.create({
        store_name: "_" + Math.random().toString(36).substr(2, 9),
        UserId: user.id,
      });

      res.status(201).json({ message: "Account created!" });
    } catch (err) {
      res.status(403).json({ message: "Email already in use!" });
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.Users.findOne({ where: { email: email, role: "user" } });
  if (!user)
    return res.status(401).json({ message: "Invalid Email or Password" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match)
      return res.status(401).json({ message: "Invalid Email or Password" });

    // generate jwt
    const token = sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    res.status(200).json({ token: token, message: "Logged In!" });
  });
};

exports.profile = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  db.Users.findByPk(decodedJwt.id, {

    // exclude the password to the response data
    attributes: {
      exclude: ["password"],
    },
    include: [db.Stores]
  })
    .then((data) => {

      // if !data means user not exist
      if (!data) return res.status(404).json("User does not exist!");

      res.json(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error retrieving profile data : ${err}`,
      });
    });
};

exports.userUpdateDetails = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  db.Users.update(
    {
      ...req.body
    },
    { where: { id: decodedJwt.id } }
  )
  .then(response => {
    res.status(200).json("Updated!")
  })
  .catch(err => {
    res.json(err)
  })
}
