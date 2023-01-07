const jwt = require('jsonwebtoken');


const isAuthenticated = (req, res, next) => {
    console.log(req.headers);
    console.log(req.query);
    next();
}


module.exports = {
    isAuthenticated
}
