const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const db = require("./models");

// admin routers import
const {
  adminProductsRouter,
  adminOrdersRouter,
  adminUsersRouter,
  adminAuthRouter,
} = require("./routes/admin");

// user routers import
const {
  usersRouter,
  productsRouter,
  storesRouter,
  cartsRouter,
  ordersRouter,
} = require("./routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// user routes
app.use("/api", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/stores", storesRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/orders", ordersRouter);

// admin routes
app.use("/api/admin/auth", adminAuthRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/users", adminUsersRouter);
app.use("/api/admin/orders", adminOrdersRouter);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
});
