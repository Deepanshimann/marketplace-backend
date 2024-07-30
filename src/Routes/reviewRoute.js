const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const reviewController=require("../controllers/review-controller");

router.post("/create",authenticate,reviewController.createReview);
router.get("/product/:productId",authenticate,reviewController.getAllReview);

module.exports=router;