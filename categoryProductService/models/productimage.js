'use strict';
module.exports = (sequelize, DataTypes) => {
  let ProductImage = sequelize.define('ProductImage', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    image: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE(3),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
    }
  },
  );

  ProductImage.associate = function (models) {
    ProductImage.belongsTo(models.Product, {
      foreignKey: "productId",
      targetKey: "id",
      as: "productImage",
    });
  };
  return ProductImage
}
