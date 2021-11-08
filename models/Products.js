module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_price: {
      type: DataTypes.FLOAT(10,2),
      allowNull: false
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Products.associate = models => {
    Products.hasMany(models.Carts)

    Products.belongsTo(models.Stores, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Products;
};
