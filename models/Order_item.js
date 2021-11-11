module.exports = (sequelize, DataTypes) => {
  const Order_item = sequelize.define("Order_item", {
    quantity: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Order_item.associate = (models) => {
    Order_item.belongsTo(models.Orders, {
      foreignKey: {
        allowNull: false
      }
    })
    Order_item.belongsTo(models.Products, {
      foreignKey: {
        allowNull: false
      }
    })
  };

  return Order_item;
};