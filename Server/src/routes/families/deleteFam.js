const FamilyModel = require("../../models/FamilyModel");
const { validationResult } = require("express-validator");
const UserModel = require("../../models/UserModel");

module.exports = async (req, res) => {
  try {
    // Get famiD from request param
    const { familyID } = req.params;

    // remove ref of fam from user
    await UserModel.updateMany(
      { family_id: familyID },
      { $pull: { family_id: familyID } }
    );

    // Delete fam
    const deletedFamily = await FamilyModel.findOneAndDelete({
      familyID: familyID,
    });

    // If fam not found or found
    if (!deletedFamily) {
      return res.status(404).send("Familie ikke fundet");
    }

    res.status(200).json({ Message: "Familien er blevet slettet" });
  } catch (error) {
    res.status(500).json({ error: error.messages });
  }
};
