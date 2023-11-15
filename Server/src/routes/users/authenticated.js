const jwt = require('jsonwebtoken')

const jwtSecretKey = "" + process.env.JWT_KEY;

module.exports = async (req, res, next) => {
    let userToken;

    if (req.body && req.body.token) {
        userToken = req.body.token;
    } else if (req.query && req.query.token) {
        userToken = req.query.token;
    } else if (req.headers && req.headers["hh-token"]) {
        userToken = req.headers["hh-token"];
    }

    try {
        const decodedToken = jwt.verify(userToken, jwtSecretKey);
        req.user = decodedToken;
        return next();
    } catch (error) {
        return res.status(401).send("Token ikke korrekt")
    }
}