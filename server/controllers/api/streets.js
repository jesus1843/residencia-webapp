const { sequelize } = require('../../models');
const { Street } = sequelize.models;


module.exports.index = async(req, res) => {
    const streets = await Street.findAll();
    res.json({
        data: streets
    });
}


module.exports.show = async(req, res) => {
    const { streetId } = req.params;

    res.json({
        data: 'street with id: '+ streetId
    });
}


module.exports.store = async(req, res) => {
    const { name } = req.body;

    res.json({
        data: 'create street with name: '+ name
    });
}


module.exports.update = async(req, res) => {
    const { streetId } = req.params;
    const { name } = req.body;

    res.json({
        data: 'update street with id: '+ streetId + ', and name: '+ name
    });
}


module.exports.delete = async(req, res) => {
    const { streetId } = req.params;

    res.json({
        data: 'delete street with id: '+ streetId
    });
}
