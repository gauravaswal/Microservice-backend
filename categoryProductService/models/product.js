'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  let Product = sequelize.define('Product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT
    },
    isDiscount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      type: DataTypes.DATE(3),
    },
    updatedAt: {
      type: DataTypes.DATE(3),
    }
  },
  );

  Product.associate = function (models) {
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      targetKey: "id",
      as: "productCategory",
    });
    Product.hasMany(models.ProductImage, {
      foreignKey: "productId",
      as: "productImages",
    });
  };
  return Product
}
