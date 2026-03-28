const express = require("express");

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

//profile
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.userrr;

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.userrr;
    
    Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key])
    await loggedInUser.save()
    res.send(loggedInUser)
    
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

module.exports = profileRouter;
