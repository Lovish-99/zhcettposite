const router = require("express").Router();
const dotenv = require("dotenv");
const Jwt = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });
require("../db/config");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin/Admin");
const nodemailer = require('nodemailer');

//company register and login - register
router.post("/comp-register", async (req, res) => {
    const { username, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await Admin.findOne({ email });
        if (oldUser) {
            return res.json({ error: "User Exists" });
        }
        const company = await Admin.create({
            username,
            email,
            password: encryptedPassword,
        });
        const token = Jwt.sign({ company }, process.env.JWTKEY, {
            expiresIn: "7h",
        });
        res.send({ status: "ok", data: { company, token } });
    } catch (error) {
        res.send({ status: "error" });
    }
});

//admin register and login - register
router.post("/admin-register", verifyToken, async (req, res) => {
    const { username, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    try {
        const oldUser = await Admin.findOne({ email });
        if (oldUser) {
            return res.json({ error: "User Exists" });
        }
        const company = await Admin.create({
            username,
            email,
            password: encryptedPassword,
            role: "admin",
        });
        const token = Jwt.sign({ company }, process.env.JWTKEY, {
            expiresIn: "7h",
        });
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

// cmpany register and login - login
router.post("/comp-login", async (req, resp) => {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });
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

router.get("/get-admins", verifyToken, async (req, resp) => {
    try {
        const data = await Admin.find({ role: "admin" });
        if (data) {
            resp.send({ status: "ok", data });
        } else {
            resp.send({ status: "error" });
        }
    }
    catch (error) {
        resp.send({ status: error });
    }
});

router.get("/get-recruit", verifyToken, async (req, resp) => {
    try {
        const data = await Admin.find({ role: "recruiter" });
        if (data) {
            resp.send({ status: "ok", data });
        } else {
            resp.send({ status: "error" });
        }
    }
    catch (error) {
        resp.send({ status: error });
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
                console.error(err.message);
                return res.status(500).json({ msg: 'Email not sent' });
            }
            console.log(`Email sent: ${info.response}`);
            res.json({ status: "ok", data: token });
        });

    } catch (error) {
        console.error(err.message);
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

function verifyToken(req, resp, next) {
    let token = req.headers["authorization"];
    if (token) {
        Jwt.verify(token, process.env.JWTKEY, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Please enter a valid token!" });
            } else {
                next();
            }
        });
    } else {
        resp.status(403).send({ result: "Please enter a token!" });
    }
}

//passowrd
router.post('/change-password', async (req, res) => {
    const { email } = req.body;
    try {
        // Find the user by email
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        // Generate a random token
        const token = Math.random().toString(36).slice(-8);
        // // Generate a salt and hash the token
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
        res.status(500).json({ msg: 'Server error' });
    }
});


// Define the route for resetting a user's password using the token
router.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        // Find the user by the token
        const user = await Admin.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
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
        res.status(500).json({ msg: 'Server error' });
    }
});

router.delete('/delete-user', verifyToken, async (req, resp) => {
    const email = req.body.email;
    try {
        Admin.deleteOne({ email: email }, function (err, obj) {
            if (err) throw err;
            resp.send({ status: "ok" });
        });
    }
    catch (error) {
        resp.send({ status: error });
    }
});

module.exports = router;