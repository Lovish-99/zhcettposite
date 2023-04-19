const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  recruiterId: { type: String, required: true },
  companyName: { type: String, required: true },
  location: { type: String, required: true },
  department: { type: String, required: true },
  about: { type: String, required: true },
  visionAndmission: { type: String, required: true },
  hiringManagerName: { type: String, required: true },
  hiringManagerImage: { type: String, required: false },
  hiringManagerPost: { type: String, required: true },
  hiringManagerContact: { type: String, required: true },
  hiringManagerBio: { type: String, required: true },

});

module.exports = mongoose.model("companyData", companySchema);
