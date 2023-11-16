const FamilyModel = require('../../models/FamilyModel');
const { validationResult } = require('express-validator');


module.exports = async (req, res) => {
    // Validates user input with express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Separates the error messages on separate lines
        const errorMessages = errors.array().map(error => error.msg).join('\n');
        return res.status(422).send(errorMessages);
    }

   try {
    

    // Get famID from param & newfamname from body
    const { familyID } = req.params;
    const { newFamilyName } = req.body;


    // Find and update fam in DB
    const updatedFamily = await FamilyModel.findOneAndUpdate(
        { familyID: familyID},
        { familyName: newFamilyName},
        { new:true }
    );

    if (!updatedFamily) {
        return res.status(404).send("Familie ikke fundet");
    }

    res.status(200).json({ message: "Familie opdateret", family: updatedFamily})

    


   } catch (error) {
       res.status(500).json({ error: error.messages});

   }
}