const FamilyModel = require('../../models/FamilyModel');
const UserModel = require('../../models/UserModel');
const { validationResult } = require('express-validator');

module.exports = async (req,res) => {
    // Validates user input with express-validator
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     // Separates the error messages on separate lines
    //     const errorMessages = errors.array().map(error => error.msg).join('\n');
    //     return res.status(422).send(errorMessages);
    // }

    try {
        // Get FamID from body & UserID 
        console.log(req)
        const familyName = req.body.familyName;
        const userID = req.body.userID;

        // Find family by ID
        const family = await FamilyModel.findOne({ familyName: familyName });
        if (!family) {
            return res.status(404).send("Familie ikke fundet");
        }

        // Check if user exists
        const user = await UserModel.findOne({ userID: userID });
        if (!user) {
            return res.status(404).send("Bruger ikke fundet");
        }

        // Check if user is part of family
        if (family.familyMember.includes(userID)) {
            return res.status(400).send("Bruger er allerede medlem af familien")
        }

        // Add user to family
        family.familyMember.push(userID);

        // if users have a reference to a family, add the ID to users family_id
        if (!user.family_id) {
            user.family_id = [];
        }
        user.family_id.push(familyName)

        // Save family and user object
        await family.save();
        await user.save();

        res.status(200).json({ message: `Brugeren ${user.userName} blev tilføjet til familien ${family.familyName}`});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}