const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "enter your name"],
  },

  email: {
    type: String,
    unique: true,
    require: [true, "enter your email"],
    validate: [validator.isEmail, "Plese provide a valid email"],
  },

  empCode: {
    type: String,
    require: [true, "enter employee code"],
  },

  department: {
    type: String,
    require: [true, "enter department"],
  },

  designation: {
    type: String,
    require: [true, "enter designation"],
  },
});

module.exports = mongoose.model("user", userSchema);
