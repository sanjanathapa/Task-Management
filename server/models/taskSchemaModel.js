import mongoose from "mongoose";

const { Schema } = mongoose;

const TaskSchema = new Schema({
  teamLeadId: {
    type: Schema.Types.ObjectId,
    ref: "TeamLead",
  },
  technologyId: {
    type: Schema.Types.ObjectId,
    ref: "Technology",
  },
  task: {
    type: String,
    required: [true, "Enter task description"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Task", TaskSchema);
