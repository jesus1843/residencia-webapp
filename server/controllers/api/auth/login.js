const jwt = require('jsonwebtoken');

const { sequelize } = require('../../../models');
const { User } = sequelize.models;


module.exports.login = async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        return res.status(404).json({
            code: 'EMAIL_OR_PWD_WRONG',
            message: '[E-mail] or password wrong'
        });
    }

    if (!user.validPassword(password)) {
        return res.status(404).json({
            code: 'EMAIL_OR_PWD_WRONG',
            message: 'E-mail or [password] wrong'
        });
    }

    const userData = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    };

    const token = jwt.sign(
        userData,
        process.env.SECRET_JWT,
        {
            expiresIn: +process.env.EXPIRATION_JWT
        }
    );

    res.json({
        user: userData,
        token,
        expiresIn: +process.env.EXPIRATION_JWT
    });
}
