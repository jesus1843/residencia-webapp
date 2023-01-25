const jwt = require('jsonwebtoken');


const isAuthenticatedHeader = (req, res, next) => {
    if ('token' in req.query) {
        try {
            const token = req.query.token;
            const decoded = jwt.verify(token, process.env.SECRET_JWT);
            req.user = decoded.user;
            return next();
        }
        catch(err) {
            return res.status(401).json({
                error: JSON.parse(JSON.stringify(err))
            });
        }
    } else {
        return res.status(401).json({
            code: 'UNAUTHENTICATED',
            message: 'You must be authenticated'
        });
    }
}


module.exports = {
    isAuthenticatedHeader
}
