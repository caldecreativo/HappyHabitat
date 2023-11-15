const User = require('../../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const jwtSecretKey = "" + process.env.JWT_KEY;

module.exports = async (req, res) => {
     //Validates userinput with express-validator
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         // Seperates the error messages on seperate lines
         const errorMessages = errors.array().map(error => error.msg).join('\n');
       return res.status(422).send(errorMessages);
     }

     try {
        // Get user data from input
        const { email, password, newEmail, newPassword } = req.body;

        // Find user in DB
        const penguinUser = await User.findOne({ email });

        // If the user does not exist
        if (!penguinUser) {
            return res.status(404).send("Bruger findes ikke");
        }

        // If the user exist
        if (await bcrypt.compare(password, penguinUser.password)) {
            // Update users data
            penguinUser.email = newEmail || penguinUser.email;
            penguinUser.password = newPassword ? bcrypt.hashSync(newPassword, 10) : penguinUser.password;

            // Save updated user data in DB
            await penguinUser.save();

            // Generate new token 
            const userToken = jwt.sign(
                { userID: penguinUser.userID, email: penguinUser.email },
                jwtSecretKey,
                { expiresIn: "1h" }
            );

            // Send updated data and token as answer
            return res.status(200).send({User: penguinUser, userToken: userToken})
        }

            //Error handling
            return res.status(400).send("Forkerte oplysninger");
     } catch (error) {
        return res.status(500).json({error: error.messages});
     }
}