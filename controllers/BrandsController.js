const Brand = require("../models/brandsModel");

exports.createBrand = async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        status: "fail",
        message:
          "Please Make Sure That You Provided the name and the image of the brand",
      });
    }

    const brand = await Brand.create(req.body);

    res.status(201).json({
      status: "success",
      data: brand,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
      status: "fail",
    });
  }
};

exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.status(200).json({
      status: "success",
      results: brands.length,
      data: brands,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
      status: "fail",
    });
  }
};

exports.getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.brandId);

    if (!brand) {
      return res.status(404).json({
        status: "fail",
        message: "No Brand With The Provided Id",
      });
    }

    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
      status: "fail",
    });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndUpdate(req.params.brandId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!brand) {
      return res.status(404).json({
        messgae: "No Brand With The Provided Id",
        status: "fail",
      });
    }

    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
      status: "fail",
    });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.brandId);

    if (!brand) {
      return res.status(404).json({
        messgae: "No Brand With The Provided Id",
        status: "fail",
      });
    }

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
      status: "fail",
    });
  }
};
