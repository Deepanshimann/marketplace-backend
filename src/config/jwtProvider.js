const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "deepanqwertyuisdfghjkcvbnm"; 

/**
 * Generates a JWT token with the user ID as payload.
 * @param {string} userId - The ID of the user.
 * @returns {string} The generated JWT token.
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
};

/**
 * Extracts and returns the user ID from a JWT token.
 * @param {string} token - The JWT token.
 * @returns {string} The user ID.
 * @throws Will throw an error if the token is invalid.
 */
const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    return decodedToken.userId;
  } catch (error) {
    console.error("Invalid token:", error);
    throw new Error("Invalid token");
  }
};

module.exports = { generateToken, getUserIdFromToken };
