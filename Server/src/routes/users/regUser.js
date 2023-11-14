const userModel = require('../../models/UserModel')

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


        // Create the user in the database
        const penguinUser = await userModel.create({
            userID: `user${DbUserID}`,
            userName,
            email,
            password
        });




        res.status(201);
        res.json(penguinUser);
    } catch (error) {
        console.log(error);
    }
}
