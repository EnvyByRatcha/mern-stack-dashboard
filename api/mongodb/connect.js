const mongoose = require("mongoose");

const connectDb = async (url) => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(url)
    .then(() => {
      console.log("mongoDb is running");
    })
    .catch((error) => {
      console.log("MongoDB connection error:", error);
    });
};

module.exports = connectDb;
