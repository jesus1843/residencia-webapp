'use strict';

const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {

    static associate(models) {
      Profile.belongsTo(models.User);
    }

  }


  Profile.init({
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });


  return Profile;
};