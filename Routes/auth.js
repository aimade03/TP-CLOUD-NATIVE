const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (token === null) {
        return res.status(403).json({ message: "required" });
    }    
    jwt.verify(token, process.env.TOKEN, (err, data) => {
        if (err) {
            return res.status(401).json("Token invalide");
        }
        req.user = data;
        next();
    });
};

module.exports = verifyToken;
