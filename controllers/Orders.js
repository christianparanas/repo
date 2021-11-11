const { sign, verify } = require("jsonwebtoken");
const { Op } = require("sequelize");

// import models
const db = require("../models");

const stripe = require("stripe")(process.env.STRP_KEY);

const { decodeJWT, getStoreId } = require("../utils/func");

exports.placeOrder = async (req, res) => {
  const {
    shippingCarrier,
    shippingPrice,
    payingMethod,
    totalPayment,
    orderItems,
  } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: orderItems.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.produtName,
            },
            unit_amount: parseInt(item.price + '00'),
          },
          quantity: item.quantity,
        };
      }),
      success_url: 'https://shoppiee.vercel.app/checkout/payment',
      cancel_url: 'https://shoppiee.vercel.app/cart',
    });

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.getCheckoutItemsData = (req, res) => {
  console.log(req.body);

  res.json(req.body);
};
