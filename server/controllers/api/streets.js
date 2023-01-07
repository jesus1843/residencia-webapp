const jwt = require('jsonwebtoken');

const { sequelize } = require('../../models');
const { User } = sequelize.models;


module.exports.index = async(req, res) => {
    res.json({
        data: 'all streets'
    });
}
