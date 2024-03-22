import mongoose from "mongoose";

const DB = "mongodb://127.0.0.1:27017/taskManagementdb";

mongoose
  .connect(DB, {})
  .then(() => {
    console.log("Successfully connected with the database");
  })
  .catch((err) => {
    console.log("Error in connection with the database: " + err);
  });

