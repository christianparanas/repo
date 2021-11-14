module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
    orderId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    order_shipping_courier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_payment_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_totalpayment: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
    },
    order_status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Orders.associate = (models) => {
    Orders.belongsTo(models.Users);
    Orders.hasMany(models.Order_item);
  };

  return Orders;
};
