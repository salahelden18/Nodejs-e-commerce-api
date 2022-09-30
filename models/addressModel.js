const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  province: {
    type: String,
    minLength: [2, "Please Make Sure The Length Of Province is Over 2"],
    trim: true,
    required: [true, "The Province is required"],
  },
  district: {
    type: String,
    minLength: [2, "Please Make Sure The Length Of Province is Over 2"],
    trim: true,
    required: [true, "The District is required"],
  },
  fullAddress: {
    type: String,
    minLength: [10, "Please Make Sure The Length Of Province is Over 10"],
    trim: true,
    required: [true, "The full address is required"],
  },
  flatNo: {
    type: Number,
    required: [true, "flatNo field is required"],
  },
  floorNo: {
    type: Number,
    required: [true, "floorNo field is required"],
  },
  phoneNumber: {
    type: String,
    trim: true,
    minLength: [11, "The minLength of the number should be 11 characters long"],
    maxLength: [11, "The Phone Number Should Not Exceed 11 characters"],
  },
  user: {
    type: String,
    trim: true,
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
