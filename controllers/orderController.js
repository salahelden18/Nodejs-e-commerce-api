const Address = require("../models/addressModel");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.placeOrder = async (req, res, next) => {
  try {
    const order = Order({
      user: req.user._id,
      products: req.user.userCart,
      address: req.body.address,
    });

    const address = await Address.findById(req.body.address);

    if (address.user !== req.user._id.toString()) {
      return next(new ErrorHandler("This address does not belong to you", 400));
    }

    console.log(req.user);
    if (req.user.userCart.length === 0) {
      return next(
        new ErrorHandler("You don't have any items in your cart.", 400)
      );
    }

    await User.updateOne({ _id: req.user._id }, { userCart: [] });

    await order.save();

    res.status(201).json({
      status: "success",
      data: order,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.getAllActiveOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ status: { $ne: "delivered" } }).populate([
      {
        path: "user",
        select: "-addresses username email _id",
      },

      {
        path: "address",
        select: "-__v",
      },
      {
        path: "products",
        populate: {
          path: "product",
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return next(
        new ErrorHandler("There is No Order With The Provided Id", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId);

    if (!order) {
      return next(
        new ErrorHandler("There is not order with the provided id", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.getUserOrders = async (req, res, next) => {
  try {
    const orders = await User.findById(req.user._id)
      .select("-addresses -userCart -role -createdAt -updatedAt")
      .populate([
        {
          path: "orders",
          populate: {
            path: "products",
          },
        },
      ]);

    res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (e) {
    console.log(e);
    next(new ErrorHandler(e.message, 500));
  }
};
