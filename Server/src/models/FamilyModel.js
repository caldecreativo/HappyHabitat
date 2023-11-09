const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
    fimilyID: {
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
{collation: "families"})

const FamilyModel = mongoose.model("families", familySchema)

module.exports = FamilyModel