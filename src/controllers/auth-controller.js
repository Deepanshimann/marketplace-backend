const userService = require("../services/user-services.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    console.log('Received body:', req.body);
    const user = await userService.createUser(req.body);
    const jwt = jwtProvider.generateToken(user._id);
    return res.status(200).send({ success: true, jwt, message: "Your Registration is Successful" });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).send({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  const { password, email } = req.body;
  try {
    console.log('Received login body:', req.body);

    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(404).send({ success: false, message: `User not found with email: ${email}` });
    }
    console.log('Found user:', user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ success: false, message: "Invalid password" });
    }

    const jwt = jwtProvider.generateToken(user._id);
    console.log('Generated JWT:', jwt);

    return res.status(200).send({ success: true, jwt, message: "You are Logged in successfully" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = { register, login };
