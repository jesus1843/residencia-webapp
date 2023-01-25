'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  class House extends Model {

    static associate(models) {
      House.belongsTo(models.Street);
    }
  }

  House.init({
    streetId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'House',
  });

  return House;
};
