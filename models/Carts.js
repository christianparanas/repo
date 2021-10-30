module.exports = (sequelize, DataTypes) => {
  const Carts = sequelize.define("Carts", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Carts.associate = models => {
    Carts.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    }),
    Carts.belongsTo(models.Products, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Carts;
};
