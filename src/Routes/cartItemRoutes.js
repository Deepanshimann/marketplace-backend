const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const cartItemController=require("../controllers/cartItem-controller");

router.put("/update/:id",authenticate,cartItemController.updateCartItem);
router.delete("/remove/:id",authenticate,cartItemController.removeCartItem);

module.exports=router;