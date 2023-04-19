const mongoose = require("mongoose");

const applyJobschema = new mongoose.Schema({
  jobId: { type: String, required: true },
  recruiterId: { type: String, required: true },
  studentId: { type: String, required: true },
  recruiterName: { type: String, required: true},
  studentName: { type: String, required: true},
  studentBranch: { type: String, required: true},
  studentEmail: { type: String, required: true},
  resume: { type: String, required: true},
  criteria: { type: String, required: false},
  email: { type: String, required: true},
  mobile: { type: String, required: true},
  companyName: {type: String, required: true},
  position: {type: String, required: true},
  jobtype: {type: String, required: false},
  jobstatus: {
    type: String,
    enum: ['applied', 'not selected', 'selected'],
    default: 'applied'
  },
});

module.exports = mongoose.model("applyjob", applyJobschema);