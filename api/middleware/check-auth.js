const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'secret_key');
        req.UserData = decoded;
        next();
    } catch (error){
        res.status(401).json({
            message: 'Auth failed'
        });
    }
   
};