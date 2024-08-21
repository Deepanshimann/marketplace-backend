const jwtProvider = require("../config/jwtProvider");
const userService = require("../services/user-services");

const authenticate = async (req, res, next) => {
  const requestId = Math.random().toString(36).substring(7); // Unique identifier for each log entry
  // console.log(`[${requestId}] Authenticate middleware invoked`);

  try {
    // console.log(`[${requestId}] Headers received:`, req.headers);

    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
      console.log(`[${requestId}] Authorization header not found`);
      return res.status(404).send({ message: "Authorization header not found" });
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      console.log(`[${requestId}] No token provided`);
      return res.status(404).send({ message: "Token not found" });
    }

    // console.log(`[${requestId}] Token received:`, token);

    let userId;
    try {
      userId = jwtProvider.getUserIdFromToken(token);
      // console.log(`[${requestId}] Extracted user ID from token:`, userId);
    } catch (error) {
      console.log("0:");
      console.log(`[${requestId}] Failed to extract user ID from token:`, error.message);
      return res.status(401).send({ message: "Invalid token" });
    }

    if (!userId) {
      console.log("1:");
      console.log(`[${requestId}] Failed to extract user ID from token`);
      return res.status(401).send({ message: "Invalid token" });
    }

    let user;
    try {
      user = await userService.findUserById(userId);
      // console.log(`[${requestId}] User found:`, user);
    } catch (error) {
      console.log(`[${requestId}] Error finding user by ID:`, error.message);
      return res.status(500).send({ message: `Error finding user with ID: ${userId}` });
    }

    if (!user) {
      console.log(`[${requestId}] User not found with ID:`, userId);
      return res.status(404).send({ message: `User not found with ID: ${userId}` });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(`[${requestId}] Error in authenticate middleware:`, error);
    return res.status(501).send({ error: error.message });
  }
};

module.exports = authenticate;
