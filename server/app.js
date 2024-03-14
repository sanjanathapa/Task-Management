import express from "express";
import cors from "cors";
import methodOverride from "method-override";
import routers from "./routes/taskRoute.js";
import "./config/db.js";

const app = express();
app.use(methodOverride("_method"));

const port = 5000;

// Middlewares
// Serve static images
app.use("/images", express.static("public/img"));
app.use("*", cors());
app.use(express.json());
app.use("/api/v1", routers);

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

