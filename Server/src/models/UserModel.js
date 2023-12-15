const mongoose = require("mongoose");

// New schema for user
const penguinUserSchema = new mongoose.Schema(
  {
    userID: { type: String, unique: true },
    userName: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    userToken: { type: String },
    family_id: [{ type: String }],
  },
  // specifies collection in DB
  { collection: "Users" }
);
// Create model from schema
let PenguinUserModel = mongoose.model("Users", penguinUserSchema);

// export model
module.exports = PenguinUserModel;
