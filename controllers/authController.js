const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const ErrorHandler = require("../utils/ErrorHandler");

exports.signup = async (req, res, next) => {
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    user.password = undefined;

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    res.status(201).json({
      status: "success",
      token,
      data: user,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
    // res.status(500).json({
    //   status: "fail",
    //   message: e.message,
    // });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorHandler("Please Provide Your Email And Password", 400)
      );

      // return res.status(400).json({
      //   status: "fail",
      //   message: "Please Provide Your Email And Password",
      // });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      // return res.status(404).json({
      //   status: "fail",
      //   message: "Email Or Password Is Incorrect",
      // });
      return next(new ErrorHandler("Email Or Password Is Incorrect", 404));
    }

    user.password = undefined;

    // generate token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);

    res.status(201).json({
      status: "success",
      token,
      data: user,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));

    // res.status(500).json({
    //   status: "fail",
    //   message: e.message,
    // });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new ErrorHandler(
          "You Are Not Logged In! Please Login To Get Access",
          401
        )
      );

      // return res.status(401).json({
      //   status: "fail",
      //   message: "You Are Not Logged In! Please Login To Get Access",
      // });
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new ErrorHandler(
          "the user belonging to this token does no longer exist",
          401
        )
      );

      // return res.status(401).json({
      //   status: "fail",
      //   message: "the user belonging to this token does no longer exist",
      // });
    }

    req.user = currentUser;
    next();
  } catch (e) {
    next(new ErrorHandler(e.message, 500));

    // res.status(500).json({
    //   status: "fail",
    //   message: e.message,
    // });
  }
};

exports.restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          "You do not have permission to perfom this action",
          403
        )
      );

      // return res.status(403).json({
      //   status: "fail",
      //   message: "You do not have permission to perfom this action",
      // });
    }

    next();
  };
