const express = require("express");
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  categoryController.createCategory
);

router.get("/", categoryController.getAllCategories);

router
  .route("/:categoryId")
  .get(categoryController.getCategory)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.updateCategory
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.deleteCategory
  );

module.exports = router;
