const userModel = require('../../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const jwtSecretKey = "" + process.env.JWT_KEY;


// Registre user
module.exports = async (req, res) => {
    // console.log(req)

    try {
        // Get the users data from input
        const {userName, email, password} = req.body;
        
        // Finds last obj in DB
        let lastUserObj = await userModel.findOne().sort({_id: -1});
        let DbUserID;

        // Extracts the number from 'userID' using Regex if lastUserObj is not null
        if (lastUserObj && lastUserObj.userID) {
            let lastNumber = /\d+$/;
            let match = lastUserObj.userID.match(lastNumber);
            DbUserID = match ? parseInt(match[0], 10) + 1 : 1;
        } else {
            // If no last user object is found, start numbering from 1
            DbUserID = 1;
        }

        // Existing users
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send("Brugeren findes allerede")
        }

        // Encrypted password to DB
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create the user in the database
        const penguinUser = await userModel.create({
            userID: `user${DbUserID}`,
            userName,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign(
            { userName: penguinUser.userName, userID: penguinUser.userID, email: penguinUser.email },
            jwtSecretKey,
            { expiresIn: "1h" }
        );

        penguinUser.userToken = token;

            penguinUser.save();

            res.cookie('JWT', token, {
                httpOnly: true,
                sameSite: 'none',
                maxAge: 1 * 60 *60 * 1000,
            })
            
            


        res.status(201).json(penguinUser);
    } catch (error) {
        console.log(error);
    }
}
