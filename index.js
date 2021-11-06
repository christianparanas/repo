const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const db = require('./models')

// admin routers
const { adminProducts, adminUsers } = require("./routes/admin")

// user routers
const { usersRouter, productsRouter, storesRouter, cartsRouter } = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/stores", storesRouter);
app.use("/api/carts", cartsRouter);

// admin routes
app.use("/api/admin/products", adminProducts)
app.use("/api/admin/users", adminUsers)

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
});
