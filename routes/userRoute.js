const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/UserController");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

//users

router.get(
  "/",
  authController.protect,
  authController.restrictTo("admin"),
  userController.getAllUsers
);

router.patch("/updateMe", authController.protect, userController.updateUser);

router.get("/getMe", authController.protect, userController.getUser);

router.use(authController.protect, authController.restrictTo("admin"));

router
  .route("/:userId")
  .get(userController.getUserById)
  .patch(userController.updateUserWithId)
  .delete(userController.deleteUser);

module.exports = router;
