const mongoose = require("mongoose");
const bycrpt = require("bcryptjs")
const { Schema, model } = mongoose;
let userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "User name must be filled"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email must be filled"]
    },
    password: {
      type: String,
      required: [true, "Password must be filled"],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "organizer", "owner"],
      default: "admin"
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const User = this;
  if (User.isModified('password')) {
    User.password = await bycrpt.hash(User.password, 12)
  }
  next();
})
userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bycrpt.compare(canditatePassword, this.password);
  return isMatch;
}

module.exports = model("User", userSchema);
