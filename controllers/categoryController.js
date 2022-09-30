const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        status: "fail",
        message: "Please Make Sure That You Provided The name and the image",
      });
    }

    const category = await Category.create(req.body);

    res.status(201).json({
      status: "success",
      data: category,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      status: "success",
      data: categories,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "There is no category with the provided Id",
      });
    }

    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.categoryId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "There is no category with the provided Id",
      });
    }

    res.status(200).json({
      status: "success",
      data: category,
    });
  } catch (e) {
    res.status(500).json({
      status: "fail",
      message: e.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.categoryId);

    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "There is no category with the provided Id",
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
