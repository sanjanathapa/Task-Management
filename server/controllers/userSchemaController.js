const User = require("../models/userSchemaModel");

exports.createUser = async (req, res) => {
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
      throw new error("Member already exist");
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
        message: "user created successfullly",
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



exports.restrictTo = (...roless) => {
  console.log(roless, "==================Rolessss============================================");
  return (req, res, next) => {
    console.log(
      "-------------------.restrictTo---------middlea----------------------------------------------",
      req.user.role
    );
    if (!roless.includes(req.user.role)) {
      return next(new AppError("Yor are not allowed for this action", 403));
    }
    next();
  };
};
