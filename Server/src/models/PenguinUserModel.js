const mongoose = require("mongoose");

const penguinUserSchema = new mongoose.Schema({
    userID: {type: String, unique: true},
    userName: {type: String, default: null},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    token: {type: String},
    family_id: [{type: String}]
},
    {collation: "PenguinUser"}
);
let PenguinUserModel = mongoose.model("PenguinUser", penguinUserSchema)

module.exports = PenguinUserModel;