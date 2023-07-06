const mongoose = require("mongoose");

const { Schema, model } = mongoose;
let categorySchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, "The minimum length of character is 3"],
      maxLength: [20, "The maximum length of character is 20"],
      required: [true, "Category name must be filled"],
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true
    }
  },
  { timestamps: true }
);
module.exports = model("Category", categorySchema);
