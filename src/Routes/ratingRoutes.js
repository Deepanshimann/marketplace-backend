const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const ratingController=require("../controllers/rating-controller");

router.post("/create",authenticate,ratingController.createRating);
router.put("/product/:productId",authenticate,ratingController.getProductRating);


module.exports=router;
