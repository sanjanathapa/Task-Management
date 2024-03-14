import express from "express";
import {
  createTask,
  createTeamLead,
  createTech,
  deleteTask,
  deleteTech,
  getAllTasks,
  getAllTeamLeads,
  getAllTech,
  getPhoto,
  updateTask,
  updateTech,
  uploadUserPhoto,
} from "../controllers/techSchemaController.js";
import { createUser } from "../controllers/userSchemaController.js";
import { login, protect, restrictTo } from "../controllers/authController.js";

const router = express.Router();

// console.log(router.delete, ">>>>>>>>>>>>>>>>>");

//login
router.post("/login", login);

//route protection and authorization
router.post("/createUser", protect, restrictTo("TL"), createUser);

// //technology
router.post("/technology", protect, restrictTo("TL"), createTech);
router.delete("/technology", protect, restrictTo("TL"), deleteTech);
router.get("/technology", protect, getAllTech);
router.put("/technology", protect, restrictTo("TL"), updateTech);

// TL
router.get("/teamLeads", getAllTeamLeads);
router.post("/createTeamLead", createTeamLead);
router.post("/uploadfile", protect, restrictTo("TL"), uploadUserPhoto);
// router.route("/profiles/:id").get(getPhoto);
router.get("/profile/:id", protect, restrictTo("TL"), getPhoto);


// //Task create
router.post("/task", protect, restrictTo("TL"), createTask);
router.get("/task", protect, restrictTo("TL"), getAllTasks);
router.put("/task/:id", protect, restrictTo("TL"), updateTask);
router.delete("/task/:id", protect, restrictTo("TL"), deleteTask);
// router.get("/home", getPhoto);
// router.get("/profile/:id", protect, restrictTo("TL"), getPhoto);

export default router;

