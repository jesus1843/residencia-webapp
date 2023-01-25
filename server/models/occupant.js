'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  class Occupant extends Model {

    static associate(models) {
      Occupant.belongsTo(models.House);
    }

  }

  Occupant.init({
    houseId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: DataTypes.STRING,
    phones: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Occupant',
  });

  return Occupant;
};
