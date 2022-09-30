const express = require("express");
const brandsController = require("../controllers/BrandsController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  brandsController.createBrand
);

router.get("/", brandsController.getAllBrands);

router
  .route("/:brandId")
  .get(brandsController.getBrand)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    brandsController.deleteBrand
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    brandsController.updateBrand
  );

module.exports = router;
