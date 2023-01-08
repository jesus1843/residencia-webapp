'use strict';

const crypto = require('crypto');
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasOne(models.Profile, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });

      User.hasMany(models.Hash, {
        onDelete: 'CASCADE',
        onUpdate: 'RESTRICT',
        foreignKey: {
          name: 'userId',
          allowNull: false
        }
      });
    }

    validPassword(password='') {
      const hashPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
      return hashPassword === this.password;
    }

  }


  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });


  return User;
};