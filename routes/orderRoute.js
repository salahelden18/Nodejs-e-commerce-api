const express = require("express");
const authController = require("../controllers/authController");
const orderController = require("../controllers/orderController");
const router = express.Router();

router.use(authController.protect);

router.post(
  "/createOrder",
  authController.restrictTo("user"),
  orderController.placeOrder
);

router.get(
  "/allActiveOrders",
  authController.restrictTo("admin"),
  orderController.getAllActiveOrders
);

router
  .route("/order/:orderId")
  .get(authController.restrictTo("admin"), orderController.getOrder)
  .patch(authController.restrictTo("admin"), orderController.updateOrder);

router.get(
  "/getUserOrders",
  authController.restrictTo("user"),
  orderController.getUserOrders
);

module.exports = router;
