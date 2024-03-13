const mongoose = require("mongoose");
const validator = require("validator");

const technologySchemaModel = new mongoose.Schema({
  technology: {
    type: String,
    required: [true, "provide tech name"],
  },
});

module.exports = mongoose.model("technology", technologySchemaModel);
