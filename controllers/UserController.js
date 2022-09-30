const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    let user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "There Is No User With The Provided Id",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "There Is No User With The Provided Id",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { role, ...other } = req.body;

    const user = await User.findByIdAndUpdate(req.user._id, other, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "There is No User With The Provided Id",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.updateUserWithId = async (req, res) => {
  try {
    const { role, ...other } = req.body;

    const user = await User.findByIdAndUpdate(req.params.userId, other, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "There is No User With The Provided Id",
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "There is No User With The Provided Id",
      });
    }

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};
