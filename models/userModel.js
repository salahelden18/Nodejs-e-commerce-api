const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      minLength: [2, "The Username must be atleast 2 characters long."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Please Provide A Valid Email"],
      lowercase: true,
      trim: true,
      unique: [
        true,
        "The Provided Email Already In Use Tyr With Different Email",
      ],
    },
    password: {
      type: String,
      minLength: [8, "Your Password Should Be atlease 8 characters"],
      select: false,
      required: [true, "password is required"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    userCart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Cart",
      },
    ],
    addresses: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Address",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

userSchema.pre(/^find/, async function (next) {
  this.populate({ path: "addresses", select: "-__v -user" });
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
