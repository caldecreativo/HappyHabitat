const userModel = require ('../../models/UserModel.js')

module.exports = async (req,res) => {
    let users = await userModel.find()

    res.json(users)
} 