const User = require("../models/userSchemaModel");
const { promisify } = require("util");
const TeamLead = require("../models/teamLeadSchemaModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//to check authentication while login and will generate a token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }
    const user = await TeamLead.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "TeamLead not found" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.email }, "secretkey", { expiresIn: "24h" });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//to protect the route or authorize
exports.protect = async (req, res, next) => {
  //1. Getting token and check if it's there
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "you are not logged in! Please login to get access" });
    //we return from this middleware and call the next one and in next() we gonna create an error
  }
  //2. Verification token

  const decoded = await promisify(jwt.verify)(token, "secretkey");
  console.log(decoded, "----------------------------------------------------------------");

  //3. Check if user still exists
  const currentUser = await TeamLead.findOne({ email: decoded.userId });
  if (!currentUser) {
    return res.status(401).json({ status: "fail", message: "The user belonging to this token does no longer exist!" });
  }

  //Grant Access to Protected Route
  req.user = currentUser;
  console.log("=====request user================", req.user);
  next();
};

exports.restrictTo = (...roless) => {
  return (req, res, next) => {
    if (!roless.includes(req.user.role)) {
      return res.status(403).json({
        message: "Yor are not allowed for this action",
      });
    }
    next();
  };
};
