const bcrypt = require('bcrypt');
const User = require('../models/user-model');
const jwtProvider = require('../config/jwtProvider');

// Function to create a new user
const createUser = async (userData) => {
  try {
    let { firstName, lastName, email, password, phoneNumber, role } = userData;

    if (!password) {
      throw new Error("Password is required");
    }

    // Check if the user already exists
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      throw new Error(`User already exists with email: ${email}`);
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create the user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      role
    });
    await user.save();
    console.log("Created user:", user);

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error.message);
  }
};


// Function to find user by email
const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).select('+password'); // Explicitly select the password
    if (!user) {
      throw new Error(`User not found with email: ${email}`);
    }
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error(error.message);
  }
};


// Function to get user profile by token
const getUserProfileByToken = async (token) => {
  try {
    const userId = jwtProvider.getUserIdFromToken(token);
    const user= (await findUserById(userId)).populate("addresses");

    if (!user) {
      throw new Error(`User not found with id: ${userId}`);
    }
console.log("user",user)
    return user;
  } catch (error) {
    console.error("Error getting user profile by token:", error);
    throw new Error(error.message);
  }
};

// Function to find user by ID
const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId)
    // .populate("address");
    if (!user) {
      throw new Error(`User not found with id: ${userId}`);
    }
    return user;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw new Error(error.message);
  }
};

// Function to get all users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw new Error(error.message);
  }
};

module.exports = { createUser, findUserByEmail, getUserProfileByToken, findUserById, getAllUsers };
