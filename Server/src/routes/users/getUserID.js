const userModel = require("../../models/UserModel");

module.exports = async (req, res) => {
  try {
    // Get userID from request param
    let userByID = req.params.id;

    // Find user by ID
    let user = await userModel.findOne({ userID: userByID });

    // Create object containing user data
    let userData = {
      id: user,
    };
    // Send data back to client in JSON format
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
