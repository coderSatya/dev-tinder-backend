// fhVfhyBEREjXGM3P

// mongodb+srv://sprakash6233_db_user:fhVfhyBEREjXGM3P@nodedemo.hkr5sug.mongodb.net/

// const URI = "mongodb+srv://sprakash6233_db_user:fhVfhyBEREjXGM3P@nodedemo.hkr5sug.mongodb.net/"

const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://sprakash6233_db_user:fhVfhyBEREjXGM3P@nodedemo.hkr5sug.mongodb.net/devTinder",
  );
};

module.exports = connectDB


