const { sequelize } = require('../../models');
const { Street } = sequelize.models;


module.exports.index = async(req, res) => {
    try {
        const streets = await Street.findAll();

        res.json({
            data: streets
        });
    }
    catch(err) {
        res.status(500).json({
            error: JSON.parse(JSON.stringify(err))
        });
    }
}


module.exports.show = async(req, res) => {
    const { streetId } = req.params;

    try {
        const street = await Street.findOne({ where: { id: streetId } });

        if (!street) {
            return res.status(404).json({
                code: 'STREET_NOT_FOUND',
                message: `Street with ID: ${streetId} not found`
            });
        }

        res.json({
            data: street
        });
    }
    catch(err) {
        res.status(500).json({
            error: JSON.parse(JSON.stringify(err))
        });
    }
}


module.exports.store = async(req, res) => {
    const { name } = req.body;

    try {
        const street = await Street.create({ name });

        res.status(201).json({
            data: street
        });
    }
    catch(err) {
        res.status(500).json({
            error: JSON.parse(JSON.stringify(err))
        });
    }
}


module.exports.update = async(req, res) => {
    const { streetId } = req.params;
    const { name } = req.body;

    try {
        const street = await Street.findOne({ where: { id: streetId } });

        if (!street) {
            return res.status(404).json({
                code: 'STREET_NOT_FOUND',
                message: `Street with ID: ${streetId} not found`
            });
        }

        street.name = name;
        await street.save();

        res.status(204).json({
            data: street
        });
    } catch(err) {
        res.status(500).json({
            error: JSON.parse(JSON.stringify(err))
        });
    }
}


module.exports.delete = async(req, res) => {
    const { streetId } = req.params;

    try {
        const street = await Street.findOne({ where: { id: streetId } });

        if (!street) {
            return res.status(404).json({
                code: 'STREET_NOT_FOUND',
                message: `Street with ID: ${streetId}, not found`
            });
        }

        await street.destroy();

        res.status(202).json({
            data: street
        });
    } catch(err) {
        res.status(500).json({
            error: JSON.parse(JSON.stringify(err))
        });
    }
}
