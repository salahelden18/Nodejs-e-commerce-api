const express = require("express");
const addressController = require("../controllers/addressController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post(
  "/",
  authController.protect,
  authController.restrictTo("user", "admin"),
  addressController.createAddress
);

router.get(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  addressController.getAllAddresses
);

router.get(
  "/getAddress/:addressId",
  authController.protect,
  authController.restrictTo("admin", "user"),
  addressController.getAddress
);

router.patch(
  "/updateAddress/:addressId",
  authController.protect,
  authController.restrictTo("user", "admin"),
  addressController.updateUserAddress
);

router.delete(
  "/deleteAddress/:addressId",
  authController.protect,
  authController.restrictTo("user", "admin"),
  addressController.deleteUserAddress
);

// router.patch(
//   "/updateAddressAdmin/:addressId",
//   authController.protect,
//   authController.restrictTo("admin"),
//   addressController.updateAddressById
// );

// router.delete(
//   "/deleteAddressAdmin/:addressId",
//   authController.protect,
//   authController.restrictTo("admin"),
//   addressController.deleteAddressById
// );

module.exports = router;
