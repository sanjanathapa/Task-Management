const express = require("express");
const techController = require("../controllers/techSchemaController");
const userController = require("../controllers/userSchemaController");
const authController = require("../controllers/authController");

const router = express.Router();
console.log(router.delete, ">>>>>>>>>>>>>>>>>");

//login
router.post("/login", authController.login);

//route protection and authorization
router.post("/createUser", authController.protect, authController.restrictTo("TL"), userController.createUser);

//technology
router.post("/technology", authController.protect, authController.restrictTo("TL"), techController.createTech);
router.delete("/technology", authController.protect, authController.restrictTo("TL"), techController.deleteTech);
router.get("/technology", authController.protect, techController.getAllTech);
router.put("/technology", authController.protect, authController.restrictTo("TL"), techController.updateTech);

// TL
router.get("/teamLeads", techController.getAllTeamLeads);
router.post("/createTeamLead", techController.uploadUserPhoto, techController.createTeamLead);
router.post("/uploadfile", authController.protect, authController.restrictTo("TL"), techController.uploadUserPhoto);
// router.route( "/profiles/:id" ).get( techController.getPhoto );

//Task create
router.post("/task", authController.protect, authController.restrictTo("TL"), techController.createTask);
router.get("/task", authController.protect, authController.restrictTo("TL"), techController.getAllTasks);
router.put("/:id", authController.protect, authController.restrictTo("TL"), techController.updateTask);
router.delete("/:id", authController.protect, authController.restrictTo("TL"), techController.deleteTask);
router.get("/:id", authController.protect, authController.restrictTo("TL"), techController.getPhoto);

module.exports = router;
