const userModel = require('../../models/UserModel')

module.exports = async (req, res) => {
    try {
       

        let userByID = req.params.id
        
        let user = await userModel.findOne({userID: userByID})

        let userData = {
            id: user
        }
        res.json(userData)
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}