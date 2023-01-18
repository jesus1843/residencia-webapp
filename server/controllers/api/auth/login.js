const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { sequelize } = require('../../../models');
const { User, Profile } = sequelize.models;

const { errorsValidator } = require('../../../helpers/validators');


module.exports.login = async(req, res) => {
    try {
        const errorsBody = validationResult(req);

        if (!errorsBody.isEmpty()) {
            const formatErrors = errorsValidator(errorsBody.errors);
            return res.status(400).json({
                type: 'ValidationError',
                errors: {
                    ...formatErrors
                }
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
            include: {
                model: Profile,
                attributes: ['id', 'userId', 'firstName', 'lastName', 'avatar']
            }
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
            profile: { ...user.Profile.toJSON() },
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };

        const token = jwt.sign(
            { user: userData },
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
    catch(err) {
        res.status(500).json({
            error: JSON.parse(JSON.stringify(err))
        })
    }
}
