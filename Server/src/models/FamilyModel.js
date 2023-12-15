const mongoose = require("mongoose");

// New schema for family
const familySchema = new mongoose.Schema(
  {
    familyID: {
      type: String,
      required: true,
      unique: true,
    },
    familyName: {
      type: String,
      required: true,
    },
    familyMember: [
      {
        type: String,
      },
    ],
  },
  // specifies collection in DB
  { collection: "Families" }
);

// Create model from schema
const FamilyModel = mongoose.model("Families", familySchema);

// export model
module.exports = FamilyModel;
