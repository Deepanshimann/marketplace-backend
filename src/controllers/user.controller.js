const userService = require("../services/user-services");

// Function to get user profile using JWT token
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you set req.user.id in your middleware
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }
    return res.status(200).send({ success: true, user });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};




// Function to get all users
const getAllUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      
      // Send the users if found
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

module.exports = {
  getUserProfile,getAllUsers,

};
