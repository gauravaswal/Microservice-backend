'use strict';
module.exports = (sequelize, DataTypes) => {
  let Dummy = sequelize.define('Dummy', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    
    indexes: [{
      name: 'dummy_index',
      using: 'BTREE',
      fields: [
        'name',
        {
          name: 'name',
          collate: 'en_US',
          order: 'DESC',
          length: 5
        }
      ]
    }
    ]
  }
  );

  // Class Method
  Dummy.associate = function (models) {
  };
  return Dummy
}


