const mongoose = require("mongoose");

const ImageDetailsScehma = new mongoose.Schema(
  {
    studentId:{type:String},
    stdupload: {type:Array},
  }
);

module.exports = mongoose.model("ImageDetails", ImageDetailsScehma)