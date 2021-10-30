module.exports = (sequelize, DataTypes) => {
  const Stores = sequelize.define("Stores", {
    store_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
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
