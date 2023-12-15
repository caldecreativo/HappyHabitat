const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// JWT secret 
const jwtSecretKey = "" + process.env.JWT_KEY;

module.exports = async (req, res) => {
  const correntUser = req.userData;
  console.log(correntUser);

  try {
    // Get userdata from body
    const { userName, email, password, newUserName, newEmail, newPassword } =
      req.body;

    // Find user in DB
    const penguinUser = await User.findOne({ email });

    // If user doesn't exist
    if (!penguinUser) {
      return res.status(404).send("Bruger findes ikke");
    }

    // If user exist
    if (await bcrypt.compare(password, penguinUser.password)) {
      // Update userinformation
      penguinUser.userName = newUserName || penguinUser.userName;
      penguinUser.email = newEmail || penguinUser.email;
      penguinUser.password = newPassword
        ? await bcrypt.hash(newPassword, 10)
        : penguinUser.password;

      // Generate new token
      const userToken = jwt.sign(
        { userID: penguinUser.userID, email: penguinUser.email },
        jwtSecretKey,
        { expiresIn: "1h" }
      );

      // Attach token to user object
      penguinUser.userToken = userToken;
      console.log(userToken);

      // Save updates to DB
      await penguinUser.save();

      res.cookie("JWT", userToken, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 1 * 60 * 60 * 1000,
      });

      // Send updated info and token as answer
      return res.status(200).send({ User: penguinUser, userToken: userToken });
    }

    // Errors with wrong answers
    return res.status(400).send("Forkerte oplysninger");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
