const mongoose = require("mongoose");

const { Schema, model } = mongoose;
let organizerSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, "Organizers name must be filled"],
    },
  },
  { timestamps: true }
);
module.exports = model("Organizer", organizerSchema);
