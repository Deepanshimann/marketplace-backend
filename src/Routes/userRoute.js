const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Route for getting user profile
router.get("/profile", userController.getUserProfile);

// Route for getting all users
router.get("/", userController.getAllUsers);

module.exports = router;
