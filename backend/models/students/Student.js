const mongoose = require("mongoose");
const validator = require("validator");
var uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcryptjs')

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "Please tell your First Name"] },
  middleName: { type: String, required: false },
  lastName: { type: String, required: [true, "Please tell your Last Name"] },
  enroll:
    { type: String },
  email: {
    type: String,
    required: [true, "Please tell your Email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please Provide correct email"],
  },
  password: {
    type: String,
    required: [true, "Please tell password"],
  },
  resetPasswordToken:
    { type: String, required: false },
  
  resetPasswordExpires:
    { type: String, required: false },
  
  passwordConfirm: {
    type: String,
    required: [false, "Please tell password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});


module.exports = mongoose.model("students", studentSchema);
