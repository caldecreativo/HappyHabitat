const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtSecretKey = "" + process.env.JWT_KEY;

module.exports = async (req, res) => {
  const correntUser = req.userData;
  console.log(correntUser);

  try {
    // Hent brugerdata fra anmodningen
    const { userName, email, password, newUserName, newEmail, newPassword } =
      req.body;

    // Find brugeren i databasen
    const penguinUser = await User.findOne({ email });

    // Hvis brugeren ikke findes
    if (!penguinUser) {
      return res.status(404).send("Bruger findes ikke");
    }

    // Hvis brugeren eksisterer
    if (await bcrypt.compare(password, penguinUser.password)) {
      // Opdater brugeroplysningerne
      penguinUser.userName = newUserName || penguinUser.userName;
      penguinUser.email = newEmail || penguinUser.email;
      penguinUser.password = newPassword
        ? await bcrypt.hash(newPassword, 10)
        : penguinUser.password;

      // Generer en ny token
      const userToken = jwt.sign(
        { userID: penguinUser.userID, email: penguinUser.email },
        jwtSecretKey,
        { expiresIn: "1h" }
      );

      // Attach token to user object
      penguinUser.userToken = userToken;
      console.log(userToken)

      // Gem de opdaterede brugeroplysninger i databasen
      await penguinUser.save();

      res.cookie("JWT", userToken, {
        httpOnly: true,
        sameSite: "none",
        maxAge: 1 * 60 * 60 * 1000,
      });

      // Send de opdaterede oplysninger og token som svar
      return res.status(200).send({ User: penguinUser, userToken: userToken });
    }

    // Håndter fejl ved forkerte oplysninger
    return res.status(400).send("Forkerte oplysninger");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
