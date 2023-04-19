const mongoose = require("mongoose");

const jobschema = new mongoose.Schema({
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  lastApplyDate: { type: String, required: true },
  requirements: {
    type: String,
    required: true,
  },
  recruiterName: { type: String, required: true},
  email: { type: String, required: true},
  mobile: { type: String, required: true},
  jobType: { type: String, required: true },
  stipend: { type: String, required: false },
  supportiveDocs: { type: String, required: false },
  description: { type: String, required: false },
  recruiterId:{type:String, required:false}
});

module.exports = mongoose.model("jobs", jobschema);
