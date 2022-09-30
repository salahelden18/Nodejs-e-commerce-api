const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: [true, "Category Name Should Be Unique"],
    minLength: [2, "The Minimum Length is 2"],
    uppercase: true,
  },
  image: {
    type: String,
    trim: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
