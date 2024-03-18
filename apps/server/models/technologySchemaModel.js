import mongoose from "mongoose";
import validator from "validator";

const technologySchemaModel = new mongoose.Schema({
  technology: {
    type: String,
    required: [true, "provide tech name"],
  },
});

export default mongoose.model("technology", technologySchemaModel);
