const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
require("../db/config");
const nodemailer = require('nodemailer');


// API TO SEND MAIL RELATED TO THE CONTACT FORM/QUERY
router.post('/send-mail', async (req, res) => {
  const emailTo = req.body.to;
  const subject = req.body.subject;
  const message = req.body.message;
  try {
    console.log("entered in the try block");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bhumisha2@gmail.com",
        pass: "hahzhrydngkfzvnn"
      }
    });
    const mailOptions = {
      from: emailTo,
      to:"bhumisha2@gmail.com",
      subject: subject,
      text: message
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Email not sent' });
      }
      console.log(`Email sent: ${info.response}`);
      res.json({ msg: 'Email sent successfully' });
    });
    console.log("entered out the block");
  }
  catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// API TO SEND MAIL FOR NOTIFING ABOUT THE JOB APLICATION STATUS UPDATE
router.post('/notify-jobstatus-mail', async (req, res) => {
  const emailTo = req.body.studentEmail;
  const position = req.body.position;
  const companyName = req.body.companyName;
  const studentName = req.body.studentName;
  const subject = "JOB APPLICATION STATUS UPDATE";
  const message = ` Dear ${studentName},

  Thank you for your interest in the ${position} role at ${companyName}. 

  Your application status has been updated. So, go on the site and check it.  
  
  If you have any questions or concerns, please don't hesitate to reach out to us.
  
  Best regards,
  
  TPO Team`;
  try {
    console.log("entered in the try block");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bhumisha2@gmail.com",
        pass: "hahzhrydngkfzvnn"
      }
    });
    const mailOptions = {
      from: emailTo,
      to:emailTo,
      subject: subject,
      text: message
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Email not sent' });
      }
      console.log(`Email sent: ${info.response}`);
      res.json({ msg: 'Email sent successfully' });
    });
    console.log("entered out the block");
  }
  catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// API TO SEND MAIL ON NOTIFING THAT YOU HAVE APPLIED FOR JOB SUCCESSFULLY
router.post('/notify-jobapply-mail', async (req, res) => {
  const emailTo = req.body.studentEmail;
  const position = req.body.position;
  const companyName = req.body.companyName;
  const studentName = req.body.studentName;
  const subject = "JOB APPLICATION SUBMITTED";
  const message = `Dear ${studentName},

  Thank you for your interest in the ${position} role at ${companyName}. 

  Your application has been submitted successfully. You, have been updated if there is any update regarding you application.  
  
  If you have any questions or concerns, please don't hesitate to reach out to us.
  
  Best regards,
  
  TPO Team`;
  try {
    console.log("entered in the try block");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bhumisha2@gmail.com",
        pass: "hahzhrydngkfzvnn"
      }
    });
    const mailOptions = {
      from: emailTo,
      to:emailTo,
      subject: subject,
      text: message
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Email not sent' });
      }
      console.log(`Email sent: ${info.response}`);
      res.json({ msg: 'Email sent successfully' });
    });
    console.log("entered out the block");
  }
  catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});
module.exports = router;