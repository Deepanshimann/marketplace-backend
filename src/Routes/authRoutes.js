const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

// Route for user signup
router.post("/signup", authController.register);

// Route for user signin
router.post("/login", authController.login);

module.exports = router;
