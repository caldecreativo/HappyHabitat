const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
    familyID: {
        type: String,
        required: true,
        unique: true
    },
    familyName: {
        type: String,
        required: true
    },
    familyMember: [{
        type: String,
    }]
},
{collection: "Families"})

const FamilyModel = mongoose.model("Families", familySchema)

module.exports = FamilyModel;