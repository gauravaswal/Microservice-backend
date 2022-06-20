'use strict';
module.exports = (sequelize, DataTypes) => {
  let ProductRating = sequelize.define('ProductRating', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
   
    rating: {
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE(3),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
    }
  },
  );

  ProductRating.associate = function (models) {
    ProductRating.belongsTo(models.Product, {
      foreignKey: "productId",
      targetKey: "id",
      as: "productsRating",
    });
  };
  return ProductRating
}
