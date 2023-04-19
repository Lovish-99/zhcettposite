const router = require("express").Router();
const dotenv = require("dotenv");
const Jwt = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });
require("../db/config");
const bcrypt = require("bcryptjs");
const Student = require("../models/students/Student");
const nodemailer = require('nodemailer');
const Enroll = require("../models/students/enroll");

router.get("/enroll", async (req, res) => {
  try {
    const data = await Enroll.find();
    if (data) {
      res.send({ status: "ok", data: { data } });
    } else {
      res.send({ status: "error" });
    }
  }
  catch (error) {
    res.send({ status: error });
  }
});

//student register and login - register
router.post("/register", async (req, res) => {
  const { firstName, middleName, lastName, enroll, email, password, passwordConfirm } = req.body;
  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await Student.findOne({ email });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    const student = await Student.create({
      firstName,
      middleName,
      lastName,
      enroll,
      email,
      password: encryptedPassword,
      resetPasswordExpires: "",
      resetPasswordToken: ""
    });
    const token = Jwt.sign({ student }, process.env.JWTKEY, {
      expiresIn: "7h",
    });
    res.send({ status: "ok", data: { student, token } });
  } catch (error) {
    res.send({ status: "error" });
  }
});


// student register and login - login
router.post("/login", async (req, resp) => {
  const { email, password } = req.body;
  const user = await Student.findOne({ email });
  if (!user) {
    return resp.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = Jwt.sign({ email: user.email }, process.env.JWTKEY, {
      expiresIn: "15h",
    });

    if (resp.status(201)) {
      return resp.json({ status: "ok", data: { user, token } });
    } else {
      return resp.json({ error: "error" });
    }
  }
  resp.json({ status: "error", error: "InvAlid Password" });
});


//passowrd
router.post('/change-password', async (req, res) => {
  const { email } = req.body;
  try {
    // Find the user by email
    const user = await Student.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }
    // Generate a random token
    const token = Math.random().toString(36).slice(-8);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bhumisha2@gmail.com",
        pass: "hahzhrydngkfzvnn"
      }
    });
    const mailOptions = {
      from: "bhumisha2@gmail.com",
      to: email,
      subject: 'Reset Password Request',
      text: `Your reset password token is ${token}. Please use this token to reset your password within the next hour.`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Email not sent' });
      }
      console.log(`Email sent: ${info.response}`);
      res.json({ msg: 'Email sent successfully' });
    });

  } catch (error) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Define the route for resetting a user's password using the token
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    // Find the user by the token
    const user = await Student.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      // console.log(user)
      // console.log("invalid")
      return res.status(400).json({ msg: 'Invalid token' });
    }
    // Generate a salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);
    // Update the user's password and reset token
    user.password = passwordHash;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.json({ msg: 'Password changed successfully' });
  } catch (err) {
    // console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

// token verification methods
//passowrd
router.post('/generate-token', async (req, res) => {
  const { email } = req.body;
  try {
    // Generate a random token
    const token = Jwt.sign({ email }, process.env.JWTKEY, {
      expiresIn: "1h",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bhumisha2@gmail.com",
        pass: "hahzhrydngkfzvnn"
      }
    });
    const mailOptions = {
      from: "bhumisha2@gmail.com",
      to: email,
      subject: 'Email Verification Request',
      text: `Your email verification token is ${token}. Please use this token to verify your account within the next hour.`
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        // console.error(err.message);
        return res.status(500).json({ msg: 'Email not sent' });
      }
      console.log(`Email sent: ${info.response}`);
      res.json({ status: "ok", data: token });
    });

  } catch (error) {
    // console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Define the route for resetting a user's password using the token
router.post('/verify-token', async (req, res) => {
  try {
    let { token } = req.body;
    console.log
    if (token) {
      Jwt.verify(token, process.env.JWTKEY, (err, valid) => {
        if (err) {
          res.status(401).send({ status: "Please enter a valid token!" });
        } else {
          res.send({ status: "ok" });
        }
      });
    } else {
      resp.status(403).send({ status: "Please enter a token!" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ status: "error", msg: 'Server error' });
  }
});


module.exports = router;