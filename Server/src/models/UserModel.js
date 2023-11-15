const mongoose = require("mongoose");

const penguinUserSchema = new mongoose.Schema({
    userID: {type: String, unique: true},
    userName: {type: String, default: null},
    email: {type: String, unique: true},
    password: {type: String, required: true},
    userToken: {type: String},
    family_id: [{type: String}]
},
    {collection: "Users"}
);
let PenguinUserModel = mongoose.model("Users", penguinUserSchema)

module.exports = PenguinUserModel;