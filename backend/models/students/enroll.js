const mongoose = require("mongoose");
const validator = require("validator");

const enrollSchema = new mongoose.Schema({
  Name: { type: String},
  Email: { type: String },
  Enroll: { type: String },
});


module.exports = mongoose.model("enrollData", enrollSchema);