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

  const storeItems = new Map([
    [1, { priceInCents: 1000, name: "React" }],
    [2, { priceInCents: 2000, name: "Vue" }],
  ]);

  const items = [
    { id: 1, quantity: 3 },
    { id: 2, quantity: 5 },
  ];

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
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
