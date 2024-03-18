import User from "../models/userSchemaModel.js";

export const createUser = async (req, res) => {
  const { name, email, empCode, designation, department } = req.body;

  if (!name || !email || !empCode || !designation || !department) {
    return res.status(400).json({
      status: "fail",
      message: "Something is missing",
    });
  }

  try {
    const preUser = await User.findOne({ email: email });
    if (preUser) {
      throw new Error("Member already exists");
    } else {
      const newUser = await User.create({
        name,
        email,
        empCode,
        designation,
        department,
      });

      return res.status(200).json({
        status: "success",
        message: "user created successfully",
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

export const restrictTo = (...roles) => {
  console.log(
    roles,
    "==================Rolessss============================================",
  );
  return (req, res, next) => {
    console.log(
      "-------------------.restrictTo---------middlea----------------------------------------------",
      req.user.role,
    );
    if (!roles.includes(req.user.role)) {
      return next(new Error("You are not allowed for this action", 403));
    }
    next();
  };
};
