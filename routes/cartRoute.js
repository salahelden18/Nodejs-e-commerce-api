const express = require("express");
const authController = require("../controllers/authController");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.use(authController.protect, authController.restrictTo("user"));

router.post("/", cartController.addToCart);

router.patch("/addOne/:cartId", cartController.addOneToQuantity);

router.patch("/removeOne/:cartId", cartController.removeOneFromCart);

router.delete("/removeCart", cartController.removeUserCart);

router.get("/getUserCart", cartController.getUserCart);

router.delete("/deleteItem/:cartId", cartController.deleteItemFromCart);

module.exports = router;
