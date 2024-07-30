const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const productController = require("../controllers/product-controller");

// Verify the imported controller functions
console.log(productController);

router.get("/", authenticate, productController.getAllProducts);
router.get("/id/:id", authenticate, productController.findProductById);

module.exports = router;
