const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "brand name field is required"],
    minLength: [2, "The Minimum Length of the Brand is 2"],
    trim: true,
    uppercase: true,
    unique: [true, "the brand name already exist"],
  },
  image: {
    type: String,
    required: [true, "Image field is required"],
  },
});

const Brand = mongoose.model("Brand", brandsSchema);

module.exports = Brand;
