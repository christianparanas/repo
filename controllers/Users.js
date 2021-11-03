const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

// model
const db = require("../models");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then(async (hashedPassword) => {
    try {
      // store user data
      const user = await db.Users.create({
        name: name,
        email: email,
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

  const user = await db.Users.findOne({ where: { email: email } });
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

    res.status(200).json({ token: token, message: "Logging In!" });
  });
};

exports.profile = async (req, res) => {
  // get the jwt from the request headers
  const uJwtToken = req.header("uJwtToken");

  // decode jwt
  const decodedJwt = await verify(uJwtToken, process.env.JWT_SECRET);

  if (!decodedJwt) return res.json(decodedJwt);

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



// admin

exports.adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10).then(async (hashedPassword) => {
    try {
      const user = await db.Users.create({
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

  const user = await db.Users.findOne({ where: { email: email } });

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
