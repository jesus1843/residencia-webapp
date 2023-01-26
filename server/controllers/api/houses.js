const { sequelize } = require('../../models');
const { Street, House } = sequelize.models;


module.exports.index = async(req, res) => {
    const { streetId } = req.params;

    try {
        const street = await Street.findOne({
            where: { id: streetId },
            attributes: ['id', 'name'],
            include: House
        });

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


module.exports.show = async(req, res) => {
    const { streetId, number } = req.params;

    try {
        const street = await Street.findOne({
            where: { id: streetId },
            attributes: ['id']
        });

        if (!street) {
            return res.status(404).json({
                code: 'STREET_NOT_FOUND',
                message: `Street with ID: ${streetId} not found`
            });
        }

        const house = await House.findOne({
            where: {
                streetId: street.id,
                number
            },
            attributes: ['id', 'number', 'createdAt']
        });

        if (!house) {
            return res.status(404).json({
                code: 'HOUSE_NOT_FOUND',
                message: `House of number: ${number}, not found`
            });
        }

        res.json({
            data: house
        });
    }
    catch(err) {
        res.status(500).json({
            error: JSON.parse(JSON.stringify(err))
        });
    }
}


module.exports.storeMultiple = async(req, res) => {
    const { streetId } = req.params;

    try {
        const street = await Street.findOne({
            where: {
                id: streetId
            },
            attributes: ['id']
        });

        if (!street) {
            return res.status(404).json({
                code: 'STREET_NOT_FOUND',
                message: `Street with ID: ${streetId} not found`
            });
        }

        const { houseMin, houseMax } = req.body;

        let housesIds = [];
        for (let houseId = houseMin; houseId <= houseMax; houseId++) {
            housesIds = [...housesIds, { streetId: street.id, number: houseId }]
        }

        await House.bulkCreate(housesIds);

        res.status(201).json({
            data: {
                street,
                houseMin,
                houseMax
            }
        });
    }
    catch(err) {
        res.status(500).json({
            error: JSON.parse(JSON.stringify(err))
        });
    }
}


module.exports.store = async(req, res) => {
    const { streetId } = req.params;

    try {
        const street = await Street.findOne({
            where: {
                id: streetId
            },
            attributes: ['id']
        });

        if (!street) {
            return res.status(404).json({
                code: 'STREET_NOT_FOUND',
                message: `Street with ID: ${streetId} not found`
            });
        }

        const { houseNum } = req.body;

        const house = await House.create({
            streetId, number: houseNum
        });

        res.status(201).json({
            data: house
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

    try {
        const street = await Street.findOne({
            where: { id: streetId },
            attributes: ['id']
        });

        if (!street) {
            return res.status(404).json({
                code: 'STREET_NOT_FOUND',
                message: `Street with ID: ${streetId} not found`
            });
        }

        const { number } = req.params;

        const house = await House.findOne({
            where: { number },
            attributes: ['id', 'number']
        });

        if (!house) {
            return res.status(404).json({
                code: 'HOUSE_NOT_FOUND',
                message: `House of number: ${number}, not found`
            });
        }

        const { houseNum } = req.body;

        house.number = houseNum;
        await house.save();

        res.status(201).json({
            data: house
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
        const street = await Street.findOne({
            where: { id: streetId },
            attributes: ['id']
        });

        if (!street) {
            return res.status(404).json({
                code: 'STREET_NOT_FOUND',
                message: `Street with ID: ${streetId}, not found`
            });
        }

        const { number } = req.params;

        const house = await House.findOne({
            where: { number },
            attributes: ['id', 'number']
        });

        if (!house) {
            return res.status(404).json({
                code: 'HOUSE_NOT_FOUND',
                message: `House of number: ${number}, not found`
            });
        }

        await house.destroy();

        res.status(202).json({
            data: house
        });
    } catch(err) {
        res.status(500).json({
            error: JSON.parse(JSON.stringify(err))
        });
    }
}
