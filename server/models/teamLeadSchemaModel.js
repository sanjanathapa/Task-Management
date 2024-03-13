const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const teamLeadSchema = new mongoose.Schema({
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
  password: {
    type: String,
    require: [true, "Please enter password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["TL", "intern"],
    default: "TL",
  },
  photo: String
});

teamLeadSchema.pre("save", function (next) {
  // console.log("this is this----------------", this);
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(15, (saltError, salt) => {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(this.password, salt, (error, hash) => {
          if (error) {
            return next(error);
          }
          this.password = hash;
          next();
        });
      }
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("teamLead", teamLeadSchema);
