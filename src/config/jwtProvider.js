const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "deepanqwertyuisdfghjkcvbnm"; 
const expiration = '18h';

function generateToken(userId) {
  return jwt.sign({ id: userId }, secret, { expiresIn: expiration });
}

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
