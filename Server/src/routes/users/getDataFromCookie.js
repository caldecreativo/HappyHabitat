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

      // Make user data object from decoded token
      userData = {
        userID: decoded.userID,
        userName: decoded.userName,
        email: decoded.email,
      };
      // Respond with the user data in JSON format
      res.json(userData);
    });
  } catch (error) {
    // error handling
    return res.status(401).send("Token ikke korrekt");
  }
};
