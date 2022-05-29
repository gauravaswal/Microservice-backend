'use strict';
module.exports = (sequelize, DataTypes) => {
let Category = sequelize.define('Category', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    unique: true
  },
  image: {
    type: DataTypes.STRING,
    required: false
  },
  description: {
    type: DataTypes.STRING,
    required: false
  },
  isdeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE(3),
  },
  updatedAt: {
    type: DataTypes.DATE(3),
  }
});

// Class Method
Category.associate = function (models) {
};
return Category
}
