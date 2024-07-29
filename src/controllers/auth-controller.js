const userService = require("../services/user-services.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    console.log('Received body:', req.body);
    const user = await userService.createUser(req.body);
    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send({ jwt, message: "Your Registration is Successful" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    console.log('Received login body:', req.body); // Log the request body

    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(404).send({ message: `User not found with email: ${email}` });
    }
    console.log('Found user:', user); // Log the retrieved user

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const jwt = jwtProvider.generateToken(user._id);
    console.log('Generated JWT:', jwt); // Log the generated JWT

    return res.status(200).send({ jwt, message: "You are Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ error: error.message });
  }
};

module.exports = { register, login };
