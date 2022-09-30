const Cart = require("../models/cartModel");
const Product = require("../models/productsModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.addToCart = async (req, res, next) => {
  try {
    const cart = Cart(req.body);

    const product = await Product.findById(cart.product);

    if (!product) {
      return next(
        new ErrorHandler("There is no product with the provided id", 404)
      );
    }

    cart.totalPrice =
      product.price * cart.quantity * ((100 - product.discount) / 100);
    cart.user = req.user._id;

    //   await cart.save();
    await Promise.all([
      cart.save(),
      User.updateOne({ _id: req.user._id }, { $push: { userCart: cart._id } }),
    ]);

    res.status(201).json({
      status: "success",
      data: cart,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

const manipulateCart = async (req, res, next, type) => {
  try {
    let cart = await Cart.findById(req.params.cartId);

    if (!cart) {
      return next(
        new ErrorHandler("There is no cart item with the provided Id", 404)
      );
    }

    const product = await Product.findById(cart.product);

    if (!product) {
      return next(
        new ErrorHandler("There is no product with the provided id", 404)
      );
    }

    if (type === "add") {
      cart.quantity = cart.quantity + 1;
    } else {
      cart.quantity = cart.quantity - 1;
    }

    cart.totalPrice =
      product.price * cart.quantity * ((100 - product.discount) / 100);

    cart = await cart.save();

    res.status(200).json({
      status: "success",
      data: cart,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.addOneToQuantity = async (req, res, next) => {
  try {
    manipulateCart(req, res, next, "add");
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.removeOneFromCart = async (req, res, next) => {
  try {
    manipulateCart(req, res, next, "remove");
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.removeUserCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(
        new ErrorHandler("There Is No User With The Provided Id", 404)
      );
    }

    const carts = user.userCart.map((id) => Cart.findByIdAndDelete(id));
    user.userCart = [];

    await Promise.all([...carts, user.save()]);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.getUserCart = async (req, res, next) => {
  try {
    const userCart = await User.findById(req.user._id)
      .select("-addresses userCart")
      .populate({
        path: "userCart",
        select: "-__v",
        populate: {
          path: "product",
          select: "_id title description imageUrl price stock discount",
        },
      });

    const cartTotalPrice = userCart.userCart.reduce(
      (acc, curr) => acc + curr.totalPrice,
      0
    );

    if (!userCart) {
      return next(
        new ErrorHandler("There is No User With The Provided Id", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: userCart,
      totalPrice: cartTotalPrice,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.deleteItemFromCart = async (req, res, next) => {
  try {
    const deleteItem = await Cart.findByIdAndDelete(req.params.cartId);

    if (!deleteItem) {
      return next(new ErrorHandler("No Item With The Provided ID", 404));
    }

    await User.updateOne(
      { _id: req.user._id },
      { $pull: { userCart: deleteItem._id } }
    );

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};
