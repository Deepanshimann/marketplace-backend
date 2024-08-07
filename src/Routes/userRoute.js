const express=require("express");

const router=express.Router();
const userController=require("../controllers/user.controller.js");
const authenticate = require("../middlewares/authenticate.js");

router.get("/",userController.getAllUsers)
// router.get("/profile",authenticate,userController.getUserProfile)
// Route for getting user profile, protected by authentication middleware
router.get("/profile", authenticate, async (req, res) => {
    const { getUserProfileByToken } = require("../services/user-services");
  
    try {
      const token = req.headers["authorization"].split(" ")[1];
      console.log("Received token for profile:", token);
  
      const user = await getUserProfileByToken(token);
      console.log("User profile retrieved:", user);
  
      res.status(200).json(user);
    } catch (error) {
      console.log("Error getting user profile:", error);
      res.status(500).json({ error: error.message });
    }
  });
module.exports=router;