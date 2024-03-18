import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Enter your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Enter your email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  empCode: {
    type: String,
    required: [true, "Enter employee code"],
  },
  department: {
    type: String,
    required: [true, "Enter department"],
  },
  designation: {
    type: String,
    required: [true, "Enter designation"],
  },
});

export default mongoose.model("user", userSchema);
