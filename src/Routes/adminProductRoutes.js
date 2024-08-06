const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const productController = require("../controllers/product-controller");

// Verify the imported controller functions
console.log(productController);

router.post("/", authenticate, productController.createProduct);
router.post("/creates", authenticate, productController.createMultipleProducts);
router.delete("/delete/:id", authenticate, productController.deleteProduct);
router.put("/:id", authenticate, productController.updateProduct);

module.exports = router;
