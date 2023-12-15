const jwt = require("jsonwebtoken");

// get JWT sercret from env
const jwtSecretKey = "" + process.env.JWT_SECRET_KEY;

module.exports = async (req, res, next) => {
  // Get JWT token from cookie in request
  let userToken = req.cookies.JWT;

  try {
    // Verify token using the secret
    const decodedToken = jwt.verify(userToken, jwtSecretKey, (err, decoded) => {
      if (err) {
        console.error("Token verified error:", err.message);
        return res.sendStatus(403);
      }
      console.log(decoded);

      // Attach decoded data to the request object
      req.userData = {
        userName: decoded.userName,
        email: decoded.email,
      };
      // call next middlewear
      next();
    });
  } catch (error) {
    // error handling
    return res.status(401).send("Token ikke korrekt");
  }
};
