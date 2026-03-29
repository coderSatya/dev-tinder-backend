const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

// signup User
authRouter.post("/signup", async (req, res) => {
  try {
    // validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password, photoUrl, about, skills, age, gender } = req.body;

    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating a new instance of he User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      photoUrl,
      password: passwordHash,
      about,
      skills,
      age,
      gender
    });

    await user.save();

    // Generate JWT and set cookie for auto-login
    const token = await user.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 8 * 3600000), // 8 hours
    });

    res.status(200).json({
      success: true,
      message: "User added successfully",
      data: user,
    });
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

// login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credential",
      });
    }

    const isPasswordValid = await user.validatedPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credential",
      });
    }

    if (isPasswordValid) {
      const token = await user.getJWT();

      // Add the token and send the response back to the user
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      return res.status(200).json({
        success: true,
        message: "Login successfully",
        data: user
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// logout
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout successfully.");
});

module.exports = authRouter;
