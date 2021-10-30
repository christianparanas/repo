const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

// model
const { Users } = require("../models");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then(async (hashedPassword) => {
    try {
      const user = await Users.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: "user",
      });

      res.status(201).json(user);
    } catch (err) {
      res.status(403).json(err.errors[0].message);
    }
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) return res.status(401).json("Invalid Email or Password");

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.status(401).json("Invalid Email or Password");

    // generate jwt
    const token = sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    res.status(200).json(token);
  });
};

exports.adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then(async (hashedPassword) => {
    try {
      const user = await Users.create({
        name: name,
        email: email,
        password: hashedPassword,
        role: "admin",
      });

      res.status(201).json(user);
    } catch (err) {
      res.status(403).json(err.errors[0].message);
    }
  });
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email: email } });

  if (!user) return res.status(401).json("Invalid Email or Password");

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.status(401).json("Invalid Email or Password");

    // generate jwt
    const token = sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET_AD,
      { expiresIn: "5h" }
    );

    res.status(200).json(token);
  });
};

