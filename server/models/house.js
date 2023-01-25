'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {

  class House extends Model {

    static associate(models) {
      House.belongsTo(models.Street);

      House.hasMany(models.Occupant, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
        foreignKey: {
          name: 'houseId',
          allowNull: false
        }
      });
    }
  }

  House.init({
    streetId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'House',
  });

  return House;
};
