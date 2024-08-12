// const express = require("express");
// const router = express.Router();
// const authenticate = require("../middlewares/authenticate");
// const orderController=require("../controllers/order-controller");

// router.post("/",authenticate,orderController.createOrderController);
// router.get("/user",authenticate,orderController.orderHistory);
// router.get("/:id",authenticate,orderController.findOrderById);

// module.exports=router;

const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const orderController = require("../controllers/order-controller");

router.post("/", authenticate, (req, res, next) => {
    console.log("POST /api/orders called");
    next();
}, orderController.createOrderController);

router.get("/user", authenticate, (req, res, next) => {
    console.log("GET /api/orders/user called");
    next();
}, orderController.orderHistory);

router.get("/:id", authenticate, (req, res, next) => {
    console.log(`GET /api/orders/${req.params.id} called`);
    next();
}, orderController.findOrderById);

module.exports = router;

