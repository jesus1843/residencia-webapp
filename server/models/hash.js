'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Hash extends Model {

    static associate(models) {
      Hash.belongsTo(models.User);
    }

  }


  Hash.init({
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Hash',
  });


  return Hash;
};
