const router = require("express").Router();
const dotenv = require("dotenv");
const Jwt = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });
require("../db/config");
const JobApply = require("../models/Notification/ApplyJob");

// API TO SAVE THE JOB APPLICATION OF THE PARTICULAR STUDENT WITH THE RESPECTIVE INFORMATION
router.post("/apply-to-job", verifyToken, async (req, resp) => {
    try {
        const {
            jobId,
            recruiterId,
            studentId,
            recruiterName,
            studentName,
            studentBranch,
            studentEmail,
            resume,
            companyName,
            position,
            jobtype,
            email,
            mobile,
        } = req.body;
        const data = await JobApply.findOne({ "jobId": jobId, "studentId": studentId });
        
        if (data) {
            resp.send({ status: "applied" });
        }
        else {
            await JobApply.create({
                jobId,
                recruiterId,
                studentId,
                recruiterName,
                studentName,
                studentBranch,
                studentEmail,
                resume,
                companyName,
                position,
                jobtype,
                email,
                mobile,
            });
            resp.send({ status: "ok" });
        }
    }
    catch (error) {
        
        resp.send({ satus: error });
    }
});

// API TO GET ALL THE APPLIED APPLICATION'S BY A PARTICULAR CANDIDATE ID
router.get("/find-job-applied/:id", verifyToken, async (req, resp) => {
    try {
        const data = await JobApply.find({ studentId: req.params.id });
        if (data) {
            resp.send({ status: "ok", data });
        }
        else {
            resp.send({ status: "error" });
        }
    }
    catch (error) {
        resp.send({ status: error });
    }
});

// API TO GET ALL THE APPLIED CANDIDATES APPLICATION FOR A PARTICULAR JOB ID
router.get("/find-job-bycomp/:id", verifyToken, async (req, resp) => {
    try {
        const data = await JobApply.find({ jobId: req.params.id });
        if (data) {
            resp.send({ status: "ok", data });
        }
        else {
            resp.send({ status: "error" });
        }
    }
    catch (error) {
        resp.send({ status: error });
    }
});

// API TO UPDATE THE POSTED JOB INFORMATION
router.put("/update-student-job-status/:jobid/:studentid", verifyToken, async (req, resp) => {
    try {
        let result = await JobApply.updateOne(
            { jobId: req.params.jobid, studentId: req.params.studentid },
            {
                $set: req.body,
            }
        );
        console.log("api hit");
        resp.send(result);
    }
    catch (error) {
        resp.send({ status: error });
    }
});

// JWT TOKEN VERIFICATION FUNCTION
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

module.exports = router;