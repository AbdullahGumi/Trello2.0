const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("connected to mongoDb");
    })
    .catch((err) => {
      console.log("connection failed " + err);
    });
};

module.exports = connectDB;
