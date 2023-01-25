'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  class Street extends Model {

    static associate(models) {
      Street.hasMany(models.House, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
        foreignKey: {
          name: 'streetId',
          allowNull: false
        }
      });
    }
  }

  Street.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Street',
  });

  return Street;
};
