const userModel = require('../../models/UserModel')
const bcrypt = require('bcrypt')

// Registre user
module.exports = async (req, res) => {
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

        // Validation
        if (!userName || !email || !password) return res.status(422).send("Der er manglende udfyldese af felter");

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




        res.status(201);
        res.json(penguinUser);
    } catch (error) {
        console.log(error);
    }
}
