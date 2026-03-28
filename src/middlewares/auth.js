const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please login")
    }

    const decodedMessage = await jwt.verify(token, "Satya@DevTinder1507");

    const { _id } = decodedMessage;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }
    req.userrr = user;
    next();
  } catch (err) {
    return res.status(400).send("Error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
