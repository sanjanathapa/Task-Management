const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  teamLeadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teamLead", // Reference to the teamLead model
  },
  technologyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "technology", // Reference to the technology model
  },
  task: {
    type: String,
    required: [true, "Enter task description"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the user model
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// taskSchema.index({ technologyId: 1 }, { unique: false });
// Define a compound unique index on userId and technologyId
// taskSchema.index({ userId: 1, technologyId: 1, task: 1 });

//With this index in place, MongoDB will enforce uniqueness for the combination of "userId" and "technologyId"
//fields in the "Task" collection, allowing you to create multiple tasks for the same user and the same
//technology while preventing duplicate entries for the same combination.
module.exports = mongoose.model("task", taskSchema);
