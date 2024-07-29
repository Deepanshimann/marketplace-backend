const userService = require("../services/user-services");

// Function to get user profile using JWT token
const getUserProfile = async (req, res) => {
  try {
    // Extract JWT from the Authorization header
    const jwt = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;

    if (!jwt) {
      return res.status(404).send({ error: "token not found" });
    }

    // Fetch user profile using the JWT token
    const user = await userService.getUserProfileByToken(jwt);

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send({ error: error.message });
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
