const FamilyModel = require("../../models/FamilyModel");

module.exports = async (req, res) => {
  try {
    // Get famID from param & newfamname from body
    const { familyID } = req.params;
    const { newFamilyName } = req.body;

    // Find and update fam in DB
    const updatedFamily = await FamilyModel.findOneAndUpdate(
      { familyID: familyID },
      { familyName: newFamilyName },
      { new: true }
    );

    // Check if fam was found and updated
    if (!updatedFamily) {
      return res.status(404).send("Familie ikke fundet");
    }

    res
      .status(200)
      .json({ message: "Familie opdateret", family: updatedFamily });

    // error handling
  } catch (error) {
    res.status(500).json({ error: error.messages });
  }
};
