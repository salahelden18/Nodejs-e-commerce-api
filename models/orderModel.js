const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "user field is required"],
    },
    address: {
      type: mongoose.Schema.ObjectId,
      ref: "Address",
      required: [true, "address field is required"],
    },
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Cart",
      },
    ],
    status: {
      type: String,
      enum: ["preparing", "in the way", "delivered"],
      default: "preparing",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
