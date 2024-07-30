const express = require("express");
const router = express.Router();
const adminController=require('../controllers/adminOrderControl');
const authenticate = require("../middlewares/authenticate");


//when user will request / firstly authenticate will execute where id will be checked by token
//then in authenticate next() will be executed and it will go to adminController and all logic in getAllOrders will be executed
router.get("/", authenticate,adminController.getAllOrders);

router.put("/:orderId/confirm",authenticate,adminController.confirmOrder);

router.put("/:orderId/delete",authenticate,adminController.deleteOrder);

router.put("/:orderId/deliver",authenticate,adminController.deliverOrder);

router.put("/:orderId/shipp",authenticate,adminController.shipOrder);

router.put("/:orderId/cancel",authenticate,adminController.cancelOrder);

module.exports=router;