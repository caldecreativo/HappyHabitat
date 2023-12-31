const User = require("../../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// get JWT sercret from env
const jwtSecretKey = "" + process.env.JWT_KEY;

module.exports = async (req, res) => {
  try {
    // Get the users data from input
    const { email, password } = req.body;

    // Find user in DB
    const penguinUser = await User.findOne({ email });

    // If user exists and password is correct
    if (penguinUser && (await bcrypt.compare(password, penguinUser.password))) {
      // Create token for authentication
      const userToken = jwt.sign(
        {
          userName: penguinUser.userName,
          userID: penguinUser.userID,
          email: penguinUser.email,
        },
        jwtSecretKey,
        { expiresIn: "1h" }
      );

      // Attach token to user object
      penguinUser.userToken = userToken;

      // Create cookie
      res.cookie("JWT", userToken, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 1 * 60 * 60 * 1000,
      });

      // Respond with user and token
      return res.status(200).json(penguinUser);
    }

    // Error msg if credentials are invalid
    return res.status(400).send("Credentials not correct");
  } catch (error) {
    // Handles server errors
    return res.status(500).json({ error: error.message });
  }
};
