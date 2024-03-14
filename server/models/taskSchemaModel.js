import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
  teamLeadId: {
    type: Schema.Types.ObjectId,
    ref: "TeamLead", // Reference to the teamLead model
  },
  technologyId: {
    type: Schema.Types.ObjectId,
    ref: "technology", // Reference to the technology model
  },
  task: {
    type: String,
    required: [true, "Enter task description"],
  },
  userId: {
    type: Schema.Types.ObjectId,
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
export default mongoose.model("task", taskSchema);
