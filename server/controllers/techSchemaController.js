import multer from "multer";
import TechSchema from "../models/technologySchemaModel.js";
import TeamLead from "../models/teamLeadSchemaModel.js";
import Task from "../models/taskSchemaModel.js";
import path from "path";
import User from "../models/userSchemaModel.js";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, "D:\\nodefile"); //server par he rkhte hai waise
    cb(null, "public/img");
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

export const uploadUserPhoto = async (req, res) => {
  const id = req.user._id;
  upload(req, res, async (err) => {
    console.log("rewwwwwwwwwwwwwwwwww", req.file);
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    const filePath = req.file.path;
    console.log(filePath, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const fileName = path.basename(filePath);
    try {
      // Find the TeamLead by ID
      const teamLead = await TeamLead.findById(id);

      // Update the TeamLead document with the file path
      teamLead.photo = filePath;

      // Save the updated document
      await teamLead.save();
      // const imageUrl = `http://localhost:5000/images/${fileName}`;

      return res.status(200).json({
        status: "success",
        message: "created successfully",
        fileName,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });
};

export const getPhoto = async (req, res) => {
  console.log("req.params>>>>>>>>>>>>>>>", req.params, req.user);
  try {
    const { id } = req.params;
    console.log("response", id);
    if (!id) return res.status(400).json({ error: "ID parameter is missing" });

    const teamLead = await TeamLead.findById(id);
    if (!teamLead) return res.status(404).json({ error: "User not found" });

    const filePath = teamLead.photo;
    if (!filePath) {
      return res.status(404).json({ error: "File not found" });
    }

    const fileExtension = path.extname(filePath);
    const fileName = path.basename(filePath);

    if (![".png", ".jpg", ".jpeg"].includes(fileExtension)) {
      return res.status(415).json({ error: "Unsupported file format" });
    }

    // const imageStream = fs.createReadStream(filePath);
    const imageUrl = `http://localhost:5000/images/${fileName}`;
    console.log(imageUrl);
    // return res.status(200).json({ status: "success", imageUrl });
    return res.status(200).json({
      status: "success",
      message: "created successfully",
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error("Error fetching profile image:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const createTeamLead = async (req, res) => {
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

export const createTech = async (req, res) => {
  const { technology } = req.body;
  if (!technology) {
    return res.status(400).json({
      message: "Enter Technology",
    });
  }

  try {
    const newTech = await TechSchema.create({
      technology,
    });

    return res.status(200).json({
      status: "success",
      message: "technology successfully created",
      newTech,
    });
  } catch (error) {
    return res.status(404).json({
      status: "fail",
      message: error.message,
    });
  }
};

export const getAllTech = async (req, res) => {
  try {
    const technologies = await TechSchema.find();
    return res.status(200).json({ status: "success", technologies });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

export const deleteTech = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedTech = await TechSchema.findByIdAndDelete({ _id: id });
    if (!deletedTech) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ status: "success", message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

export const updateTech = async (req, res) => {
  console.log("sanjfajsfhjdfhdj", req.params);

  try {
    const { id } = req.params;
    console.log("snajnajnjnajnajnjnajnjnjjnjnjnjnjnj", id);
    const { technology } = req.body;

    if (!technology) {
      return res.status(400).json({ message: "Technology field required for update" });
    }

    const updatedTech = await TechSchema.findByIdAndUpdate({ _id: id }, { technology }, { new: true });

    if (!updatedTech) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

export const getAllTeamLeads = async (req, res) => {
  console.log(">>>>>>>>>>>>req");
  try {
    const teamLead = await TeamLead.find();
    console.log("team Lead", teamLead);
    return res.status(200).json({ status: "success", teamLead });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

export const createTask = async (req, res) => {
  console.log("this is request for task>>>>>>>>>>>>>>>>>", req.user._id);
  try {
    const teamLeadId = req.user._id;
    console.log("teamLeadEmail>>>>>>>>>>>>>>>>>>>", teamLeadId);
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

export const getAllTasks = async (req, res) => {
  try {
    const { search } = req.query;

    const query = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $lookup: {
          from: "teamleads",
          localField: "teamLeadId",
          foreignField: "_id",
          as: "teamLead",
        },
      },

      {
        $lookup: {
          from: "technologies",
          localField: "technologyId",
          foreignField: "_id",
          as: "technology",
        },
      },

      // {
      //   $project: {
      //     teamLeadId: 1,
      //     technologyId: 1,
      //     task: 1,
      //     userId: {
      //       $arrayElemAt: ["$user", 0],
      //     },
      //     createdAt: 1,
      //   },
      // },
    ];

    if (search) {
      query.push({
        $match: {
          $or: [
            // { task: { $regex: search, $options: "i" } },
            { "user.name": { $regex: search, $options: "i" } },
            { "teamLead.name": { $regex: search, $options: "i" } },
            { "technology.technology": { $regex: search, $options: "i" } },
          ],
        },
      });
    }
    console.log("query>>>>>>>>>>>>>>>>>>>>>>>", query);
    const tasks = await Task.aggregate(query);

    return res.status(200).json({ status: "success", tasks });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ message: "Task field required for update" });
    }

    const updatedTask = await Task.findByIdAndUpdate({ _id: id }, { task }, { new: true });
    console.log("updateTask>>>>>>>>>>>>>", updatedTask);
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  console.log("req.parmas.ID>>>>>>>>>>>>>>>>>>>>", req.params);
  try {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete({ _id: id });
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ status: "success", message: "Task deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};

export const search = async (req, res) => {
  try {
    const searchTerm = req.query.name; // Assuming the search term is passed as a query parameter named 'term'
    console.log(searchTerm, "------------------------");
    const data = await Task.find({
      name: { $regex: searchTerm, $options: "i" },
    });
    console.log(data, "--------------------------");

    return res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    return res.status(500).json({ status: "fail", message: error.message });
  }
};
