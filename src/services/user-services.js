const bcrypt = require('bcrypt');
const User = require('../models/user-model');

const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password } = userData;

    // Check if the user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error("User already exists with email:", email);
    }

    // Hash the password before saving
    password = await bcrypt.hash(password, 8);

    // Create the user
    const user = await User.create({ firstName, lastName, email, password,phoneNumber,role });
    console.log("Created user:", user);

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};


const getUserProfileByToken = async (token) => {
    try {
      const userId = jwtProvider.getUserIdFromToken(token);
  
      const user = await findUserById(userId);
  
      if (!user) {
        throw new Error("User not found with id: " + userId);
      }
  
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  

const findUserByEmail = async (email) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(`User not found with email: ${email}`);
      }
      return user;
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error(error.message);
    }
  };

const findUserById = async (userId) => {
    try {
      const user = await User.findById(userId).populate("address");
      if (!user) {
        throw new Error(`User not found with id: ${userId}`);
      }
      return user;
    } catch (error) {
      console.error("Error finding user by ID:", error);
      throw new Error(error.message);
    }
  };



  

module.exports = { createUser,getUserProfileByToken,findUserByEmail,findUserById };
