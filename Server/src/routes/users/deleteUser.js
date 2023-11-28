const User = require('../../models/UserModel')

module.exports = async (req, res) => {
    try {
        // Get user id from param
        const userId = req.params.id;

        console.log('Delete user route called');
        // Find user in DB and delete
        const user = await User.findOneAndDelete({userID: userId});
       
        console.log(user)
        // If user does not exist
        if (!user){
            return res.status(404).json({message:"Bruger blev ikke fundet"});
        }


        // Return succes msg
        return res.status(200).json ({message: "Bruger blev slettet"});

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}