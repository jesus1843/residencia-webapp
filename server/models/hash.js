'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Hash extends Model {

    static associate(models) {
      Hash.belongsTo(models.User);
    }

  }


  Hash.init({
    type: DataTypes.STRING,
    value: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hash',
  });


  return Hash;
};
