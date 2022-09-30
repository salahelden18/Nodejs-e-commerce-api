const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    required: [true, "productId field is required"],
  },
  totalPrice: {
    type: Number,
    min: [1, "you cannot have price below 1"],
    default: 1,
  },
  quantity: {
    type: Number,
    default: 1,
    min: [1, "you cannot have a quantity below 1"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
