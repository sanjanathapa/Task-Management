const multer = require("multer");
const TechSchema = require("../models/technologySchemaModel");
const TeamLead = require("../models/teamLeadSchemaModel");
const Task = require("../models/taskSchemaModel");
const path = require("path");
const fs = require("fs");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "D:\\nodefile"); //server par he rkhte hai waise
    // cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `user-${req.user._id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  console.log("file-------------------------", file);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("File type not supported. Only images are allowed."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
}).single("photo");

// exports.uploadUserPhoto = upload.single( "photo" );

exports.uploadUserPhoto = async (req, res) => {
  const id = req.user._id;
  upload(req, res, async (err) => {
    console.log("rewwwwwwwwwwwwwwwwww", req.file);
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const filePath = req.file.path;

    try {
      // Find the TeamLead by ID
      const teamLead = await TeamLead.findById(id);

      // Update the TeamLead document with the file path
      teamLead.photo = filePath;

      // Save the updated document
      await teamLead.save();

      return res.status(200).json({
        status: "success",
        message: "created successfully",
        filePath: filePath,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

// exports.getPhoto = async (req, res) => {
//   const { id } = req.query;
//   console.log("id.................................", id);
//   //65df2678b175692e6af1306f
//   try {
//     const teamLead = await TeamLead.findById({ _id: id });

//     if (!teamLead) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const filePath = teamLead.photo;
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", filePath);
//     // Check if the file exists
//     if (!filePath) {
//       return res.status(404).json({ error: "File not found" });
//     }

//     // Extract the filename without the directory path
//     const filename = path.basename(filePath);
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>");
//     console.log(filename, "filename");

//     const getFileExt = (ext) => {
//       if (ext === ".png") {
//         return "image/x-png";
//       } else if (ext === ".jpeg" || ext === ".jpg") {
//         return "image/jpeg";
//       }
//     };

//     try {
//       //to extract the file extension
//       const fileExtension = path.extname(filePath);
//       console.log("filepath>>>>>>>>>>>>>>>>>>>>>", fileExtension);
//       const imageBuffer = await fs.promises.readFile(filePath);
//       // const imageBuffer = await fs.readFile(path.join(filePath));
//       res.setHeader("Content-Type", getFileExt(fileExtension));
//       res.setHeader("Cache-Control", "no-cache");

//       res.status(200).send(imageBuffer);
//     } catch (error) {
//       console.error("Error fetching profile image:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   } catch (error) {
//     console.log("error>>>>>>>>>>>>>>>>>", error);
//     return res.status(500).json({ error: "Internal sanjanaj server error" });
//   }
// };

exports.getPhoto = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID parameter is missing" });
    }

    const teamLead = await TeamLead.findById(id);

    if (!teamLead) {
      return res.status(404).json({ error: "User not found" });
    }

    const filePath = teamLead.photo;

    if (!filePath) {
      return res.status(404).json({ error: "File not found" });
    }

    const fileExtension = path.extname(filePath);

    if (![".png", ".jpg", ".jpeg"].includes(fileExtension)) {
      return res.status(415).json({ error: "Unsupported file format" });
    }

    const imageStream = fs.createReadStream(filePath);

    res.setHeader("Content-Type", `image/${fileExtension.slice(1)}`);
    res.setHeader("Cache-Control", "no-cache");

    imageStream.pipe(res);
  } catch (error) {
    console.error("Error fetching profile image:", error);
    return res.status(500).send("Internal Server Error");
  }
};

exports.createTeamLead = async (req, res) => {
  console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj", req.body);
  console.log("file upload>>>>>>>>>>", req.file);
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({
      message: "enter the details",
    });
  }

  try {
    const preUser = await TeamLead.findOne({ email: email });

    if (preUser) {
      throw new error("TeamLead already exist");
    } else {
      const newUser = await TeamLead.create({
        name,
        email,
        password,
        role,
      });

      return res.status(200).json({
        status: "success",
        message: "TeamLead created successfullly",
        newUser,
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.createTech = async (req, res) => {
  const { technology } = req.body;
  if (!technology) {
    return res.status(400).json({
      message: "Enter Technology",
    });
  }

  try {
    const newTask = await TechSchema.create({
      technology,
    });

    return res.status(200).json({
      status: "success",
      message: "technology successfully created",
      newTask,
    });
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getAllTech = async (req, res) => {
  try {
    const tasks = await TechSchema.find();
    return res.status(200).json({ status: "success", tasks });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.deleteTech = async (req, res) => {
  try {
    const id = req.query.id;
    const deletedTech = await TechSchema.findByIdAndDelete({ _id: id });
    if (!deletedTech) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ status: "success", message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.updateTech = async (req, res) => {
  console.log("sanjfajsfhjdfhdj", req.query);

  try {
    const { id } = req.query;
    console.log("snajnajnjnajnajnjnajnjnjjnjnjnjnjnj", id);
    const { technology } = req.body;

    if (!technology) {
      return res.status(400).json({ message: "Technology field required for update" });
    }

    const updatedTech = await TechSchema.findByIdAndUpdate({ _id: id }, { technology }, { new: true });

    if (!updatedTech) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ status: "success", message: "Task updated successfully", updatedTask });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.getAllTeamLeads = async (req, res) => {
  console.log(">>>>>>>>>>>>req");
  try {
    const teamLead = await TeamLead.find();
    console.log("team Lead", teamLead);
    return res.status(200).json({ status: "success", teamLead });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.createTask = async (req, res) => {
  console.log("this is request for task>>>>>>>>>>>>>>>>>", req.user._id);
  try {
    const teamLeadId = req.user._id;
    console.log("teamLeadEmail>>>>>>>>>>>>>>>>>>>", teamLeadId);
    //65ddb4fa5f5fab88495ff551  //65ddb530c34f815f32c6a526 //65ddb549036dcf03203c3933
    //65dc68a37fa5c4b61908cb5d
    // Create a new task document
    console.log("sanjanjannnnnnnnnnnnn", req.body);
    const newTask = await Task.create({
      teamLeadId,
      technologyId: req.body.technologyId,
      task: req.body.task,
      userId: req.body.userId,
    });

    // Populate the referenced fields to replace the IDs with the actual documents
    await newTask.populate("teamLeadId technologyId userId");
    // Send back the whole response with populated fields
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    res.status(500).json({ success: false, message: "try again", error: err.message });
  }
};

exports.getAllTasks = async (req, res) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>req", req.user._id);

  try {
    const tasks = await Task.find().populate("teamLeadId technologyId userId");
    return res.status(200).json({ status: "success", tasks });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("snajnajnjnajnajnjnajnjnjjnjnjnjnjnj", req.body);
    const { task } = req.body;
    console.log("task>>>>>>>>>>>>>>>>>>>>>>", task);
    if (!task) {
      return res.status(400).json({ message: "Task field required for update" });
    }

    const updatedTask = await Task.findByIdAndUpdate({ _id: id }, { task }, { new: true });
    console.log("updateTask>>>>>>>>>>>>>", updatedTask);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ status: "success", message: "Task updated successfully", updatedTask });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = req.query.id;
    const deletedTask = await Task.findByIdAndDelete({ _id: id });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ status: "success", message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};
