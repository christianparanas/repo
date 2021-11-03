module.exports = (sequelize, DataTypes) => {
  const Stores = sequelize.define("Stores", {
    store_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    store_image: {
      type: DataTypes.STRING,
    },
    store_address: {
      type: DataTypes.STRING,
    },
  });

  Stores.associate = (models) => {
    Stores.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
      },
    });

    Stores.hasMany(models.Products);
  };

  return Stores;
};
