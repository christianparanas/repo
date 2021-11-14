const { sign, verify } = require("jsonwebtoken");
const { Op } = require("sequelize");

// import models
const db = require("../models");

const stripe = require("stripe")(process.env.STRP_KEY);

const { decodeJWT, getStoreId } = require("../utils/func");


exports.getOrders = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  db.Orders.findAll({ where: { UserId: decodedJwt.id } })
  .then((response) => {
    res.status(200).json(response)
  })
}


exports.placeOrder = async (req, res) => {
  const decodedJwt = await decodeJWT(req.header("uJwtToken"));

  const { shippingCarrier, payingMethod, orderItems, totalPayment } = req.body;

  if (payingMethod == "Cash on Delivery") {
    console.log(orderItems);

    // store to orders table the order details
    db.Orders.create({
      order_shipping_courier: shippingCarrier,
      order_payment_method: payingMethod,
      order_totalpayment: totalPayment,
      UserId: decodedJwt.id,
      order_status: "Unpaid",
    })
      .then((response) => {
        if (response) {
          // store order items details to order_item table
          orderItems.map(async (item) => {
            db.Order_item.create({
              quantity: item.quantity,
              OrderId: response.id,
              ProductId: item.productId,
            }).catch((err) => {
              res.json(err);
            });
          });

          // remove cart items if already placed
          orderItems.map(async (item) => {
            db.Carts.destroy({
              where: { ProductId: item.productId, UserId: decodedJwt.id },
            }).catch((err) => {
              res.json(err);
            });
          });
        }

        res.status(201).json({ message: "Order Placed Successfully!" });
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        shipping_rates:
          shippingCarrier == "Entrego"
            ? ["shr_1JubAqAQGMDqUKAgUzcusfhS"]
            : ["shr_1Jub97AQGMDqUKAgwRI2bIyw"],
        line_items: orderItems.map((item) => {
          return {
            price_data: {
              currency: "php",
              product_data: {
                name: item.produtName,
              },
              unit_amount: parseInt(item.price + "00"),
            },
            quantity: item.quantity,
          };
        }),
        success_url: "https://shoppiee.vercel.app/checkout/success",
        cancel_url: "https://shoppiee.vercel.app/cart",
      });

      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }

    db.Orders.create({
      order_shipping_courier: shippingCarrier,
      order_payment_method: payingMethod,
      order_totalpayment: totalPayment,
      UserId: decodedJwt.id,
      order_status: "Paid",
    })
      .then((response) => {
        if (response) {
          // store order items details to order_item table
          orderItems.map(async (item) => {
            db.Order_item.create({
              quantity: item.quantity,
              OrderId: response.id,
              ProductId: item.productId,
            }).catch((err) => {
              res.json(err);
            });
          });

          // remove cart items if already placed
          orderItems.map(async (item) => {
            db.Carts.destroy({
              where: { ProductId: item.productId, UserId: decodedJwt.id },
            }).catch((err) => {
              res.json(err);
            });
          });
        }
      })
      .catch((err) => {
        res.json(err);
      });
  }
};