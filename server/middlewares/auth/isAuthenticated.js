const jwt = require('jsonwebtoken');


const isAuthenticated = (req, res, next) => {
    if ('authorization' in req.headers) {
        const authorization = req.headers.authorization;
        if (authorization.startsWith('Bearer ')) {
            try {
                const token = authorization.split('Bearer ')[1];
                const decoded = jwt.verify(token, process.env.SECRET_JWT);
                req.user = decoded.user;
                return next();
            }
            catch(err) {
                return res.status(401).json({
                    error: JSON.parse(JSON.stringify(err))
                });
            }
        }
    } else if ('token' in req.query) {
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
    // console.log(req.query);
}


module.exports = {
    isAuthenticated
}
