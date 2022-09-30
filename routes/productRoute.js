const express = require("express");
const authController = require("../controllers/authController");
const productController = require("../controllers/productController");
const router = express.Router();

// Get All Products
router.get("/", productController.getAllProducts);

//Get Product With ID
router.get("/:productId", productController.getProduct);

// Middlewares protect, restrict to
router.use(authController.protect, authController.restrictTo("admin"));

// create product only admins
router.post("/", productController.createProduct);

// update product only admins
router.patch("/updateProduct/:productId", productController.updateProduct);

// delete product only admins
router.delete("/deleteProduct/:productId", productController.deleteProduct);

module.exports = router;
