const FamilyModel = require('../../models/FamilyModel');
const UserModel = require('../../models/UserModel');

module.exports = async (req, res) => {

    try {
        // Get famID from params & userID from body
        const familyID = req.params.familyID;
        const { userID } = req.body;

        // Remove user from fam
        const family = await FamilyModel.findOneAndUpdate(
            { familyID: familyID },
            { $pull: { familyMember: userID }},
            { new: true }
        );

        if (!family) {
            return res.status(404).send("Familie ikke fundet");
        }

        // Remove family from user's fam list
        const user = await UserModel.findOneAndUpdate(
            { userID: userID},
            { $pull: { family_id: familyID}},
            { new: true}
        );

        if (!user) {
            return res.status(404).send("Bruger ikke fundet");
        }

        res.status(200).json({ message: `Brugeren ${user.userName} blev fjernet fra familien ${family.familyName}`})

    } catch (error) {
        res.status(500).json({ error: error.messages});

    }
}