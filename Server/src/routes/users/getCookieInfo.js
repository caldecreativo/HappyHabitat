const jwt = require('jsonwebtoken')

const jwtSecretKey = "" + process.env.JWT_SECRET_KEY;

module.exports = async (req, res, next) => {
    let userToken = req.cookies.JWT;



    try {
        const decodedToken = jwt.verify(userToken, jwtSecretKey, (err, decoded) => {
            if (err) {
                console.error('Token verified error:', err.message);
                return res.sendStatus(403)
            }
            console.log(decoded)
            userData = {
                userID: decoded.userID,
                userName: decoded.userName,
                email: decoded.email,
                
            }
            res.json(userData);
        });
    } catch (error) {
        return res.status(401).send("Token ikke korrekt")
    }
}

