const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "please provide name ,email and password",
        });
    }

    const existinguser = await User.findOne({ email });
    if (existinguser) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Already exist user with same email",
        });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = await User.create({
      name,
      email,
      password: hashedPassword,
      plan: "Free", 
      totalshortLinks: 0, 
      planExpiresAt: null,
    });

    res.status(201).json({
      success: true,
      message: "New user register successfully",
      data: {
        _id: newuser._id,
        name: newuser.name,
        email: newuser.email,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "please provide email and password" });
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: true, token: token });
  } catch (error) {
    next(error);
    // console.error('Login error:',error);
    // res.status(500).json({success:false,message:'Internal server error'});
  }
};

module.exports = { registerUser, loginUser };
