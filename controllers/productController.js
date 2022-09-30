const Product = require("../models/productsModel");
const ErrorHandler = require("../utils/ErrorHandler");

exports.createProduct = async (req, res, next) => {
  try {
    const { marka, title, description, stock, imageUrl, price, category } =
      req.body;

    if (
      (!marka || !title || !description || !stock || !imageUrl || !price,
      !category)
    ) {
      return next(
        new ErrorHandler("Please Check All The Required Fields", 400)
      );
    }

    const product = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      data: product,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return next(
        new ErrorHandler("There Is No Product With The Provided Id", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return next(
        new ErrorHandler("There is no product with the provided id.", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.productId);

    if (!product) {
      return next(
        new ErrorHandler("There is no product with the provided id.", 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    next(new ErrorHandler(e.message, 500));
  }
};
