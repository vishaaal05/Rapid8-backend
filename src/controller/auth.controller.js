const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const HospitalStaff = require("../models/hospitalStaff.model"); // Assuming you have this model
const User = require("../models/user.model"); // For patient logins

// @desc    Login user/staff
// @route   POST /api/auth/login
// @access  Public

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!password.trim() || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Determine which model to use based on role
    const user = await User.findOne({ email });

    if (!user.length) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const loggedInUser = await bcrypt.compare(password, user.password);

    if(loggedInUser) {
        
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { login };
