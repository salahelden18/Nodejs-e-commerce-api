const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  marka: {
    type: String,
    required: [true, "Marka field is required"],
    trim: true,
    minLength: [2, "The min characters length sould be at least 2"],
    uppercase: true,
  },
  category: {
    type: String,
    required: [true, "Category field is required"],
    trim: true,
    minLength: [2, "The min characters length sould be at least 2"],
    uppercase: true,
  },
  title: {
    type: String,
    unique: [true, "This title is already in use"],
    required: [true, "title field is required"],
    minLength: [10, "The min characters length should be at leasr 2"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description field is required"],
    minLength: [10, "The min characters length should be at leasr 2"],
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
    required: [true, "image field is required"],
  },
  price: {
    type: Number,
    min: [1, "The min Price is 1"],
    required: [true, "Price field is required"],
  },
  discount: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: [true, "stock field is required"],
    min: [1, "You Should at least have 1 in the stock"],
  },
  isTopProduct: {
    type: Boolean,
    default: false,
  },
  isTredingProduct: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
