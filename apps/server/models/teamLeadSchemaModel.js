import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const teamLeadSchema = new Schema({
  name: {
    type: String,
    required: [true, "enter your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "enter your email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ["TL", "intern"],
    default: "TL",
  },
  photo: String,
});

teamLeadSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(15);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.model("TeamLead", teamLeadSchema);
