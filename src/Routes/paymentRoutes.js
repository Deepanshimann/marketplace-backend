const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const paymentController=require('../controllers/payment-controller');

router.post('/:id',authenticate,paymentController.createPaymentLink);
router.get('/',authenticate,paymentController.updatePaymentInformation);

module.exports=router;