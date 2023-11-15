const FamilyModel = require('../../models/FamilyModel');
const UserModel = require('../../models/UserModel');
const { validationResult } = require('express-validator');

module.exports = async(req, res) => {
    // Validates user input with express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Separates the error messages on separate lines
        const errorMessages = errors.array().map(error => error.msg).join('\n');
        return res.status(422).send(errorMessages);
    }

    try {
        // Get family data from request
        const { familyName, userID } = req.body;

        // Finds last object in the Family collection
        let lastFamilyObj = await FamilyModel.findOne().sort({_id: -1});
        let familyIdFromDB;
        
        // Extracts the number from 'familyID' using Regex if lastFamilyObj is not null
        if (lastFamilyObj && lastFamilyObj.familyID) {
            let lastNumber = /\d+$/;
            let match = lastFamilyObj.familyID.match(lastNumber);
            familyIdFromDB = match ? parseInt(match[0], 10) + 1 : 1;
        } else {
            // If no last family object is found, start numbering from 1
            familyIdFromDB = 1;
        }

        // Create new family object
        const newFamily = new FamilyModel({
            familyID: `family${familyIdFromDB}`,
            familyName,
            familyMember: []
        });

        // Attach user to family if userID is provided
        if (userID) {
            const userObject = await UserModel.findOne({userID: userID});
            if (!userObject) {
                return res.status(404).send("Bruger ikke fundet");
            }
            userObject.family_id = newFamily.familyID; // Assuming UserModel has a family_id field
            await userObject.save();
            newFamily.familyMember.push(userID);
        }

        // Save family to the database
        await newFamily.save();
        res.status(201).json(newFamily);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}