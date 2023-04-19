const router = require("express").Router();
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
require("../db/config");
const EnrollData = require("../models/students/enroll");
const multer = require("multer");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
var csv = require("csvtojson");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static(path.resolve(__dirname, 'public')));

// MULTER FUNCTION CONNECTION FOR STORING THE FILE FROM THE FRONT-END TO THE BACKEND
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploadDoc');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

var upload = multer({ storage: storage });

// API TO IMPORT THE CSV FILE OF THE AUTHENTICATED STUDENT'S IN THE DATABASE
router.post('/import-csv', upload.single("file"), async (req, resp) => {
    try {
        var userData = [];
        csv()
            .fromFile(req.file.path)
            .then(async (response) => {
                for (var x = 0; x < response.length; x++) {
                    userData.push({
                        Name: response[x].Name,
                        Enroll: response[x].Enrollment,
                        Email: response[x].Email,
                    })
                }

                await EnrollData.insertMany(userData);
            });

        resp.send({ status: 200, success: true, msg: "running" });
    }
    catch (error) {
        resp.send({ status: error });
    }
});

// API TO SEND MAIL ON NOTIFING THAT YOU HAVE APPLIED FOR JOB SUCCESSFULLY
router.post('/notify-jobposting', async (req, res) => {
    try {
        const userInfo = await EnrollData.find();
        console.log("entered in the try block");
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "bhumisha2@gmail.com",
                pass: "hahzhrydngkfzvnn"
            }
        });
        for (let i = 0; i < userInfo.length; i++) {
            console.log(userInfo[i].Email);

            const emailTo = "sumanvarshney9122@gmail.com";
            const subject = "New Job Posted";
            const message = `Dear Student,
  
            New Job is posted in our TPO Portal. Go, View and Apply to it.  
    
            If you have any questions or concerns, please don't hesitate to reach out to us.
    
            Best regards,
    
            TPO Team`;

            const mailOptions = {
                from: emailTo,
                to: emailTo,
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
        }
        console.log("entered out the block");
    }
    catch (error) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;