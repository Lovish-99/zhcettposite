const router = require("express").Router();
const dotenv = require("dotenv");
const Jwt = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });
require("../db/config");
const Jobs = require("../models/Notification/JobPost");


//APIS FOR JOB SCHEMA

// API FOR CREATING THE JOB BY THE RECRUITER & ADMIN
router.post("/upload-job", verifyToken, async (req, resp) => {
    const {
        companyName,
        position,
        lastApplyDate,
        requirements,
        stipend,
        jobType,
        supportiveDocs,
        description,
        recruiterId,
        email,
        mobile,
        recruiterName,
    } = req.body;
    try {
        await Jobs.create({
            companyName,
            position,
            lastApplyDate,
            requirements,
            stipend,
            jobType,
            supportiveDocs,
            description,
            recruiterId,
            email,
            mobile,
            recruiterName,
        });
        resp.send({ Status: "ok" });
    } catch (error) {
        resp.send({ Status: "error", data: error });
    }
});

// API TO GET ALL THE POSTED JOBS BY RECRUITER & ADMIN
router.get("/get-job", verifyToken, async (req, resp) => {
    try {
        const data = await Jobs.find();
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

// API TO GET THE INFORMATION REGARDING THE PARTICULAR JOB BY IT'S JOB ID
router.get("/get-job/:id", verifyToken, async (req, resp) => {
    try {
        const data = await Jobs.findOne({ _id: req.params.id });
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

// API TO COLLECT ALL THE JOBS POSTED BY THE RECRUITER
router.get("/get-job-recruiter/:id", verifyToken, async (req, resp) => {
    try {
        const data = await Jobs.find({ recruiterId:req.params.id});
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

// API TO GET THE INFORMATION OF A PARTICULAR JOB POSTED BY IT'S OWN RECRUITER
router.get("/get-job-recruiter/:id/:recruiter", verifyToken, async (req, resp) => {
    try {
        const data = await Jobs.findOne({ recruiterId:req.params.recruiter, _id:req.params.id});
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

// API TO UPDATE THE POSTED JOB INFORMATION
router.put("/update-job/:id", verifyToken, async (req, resp) => {
    try {
        let result = await Jobs.updateOne(
            { _id: req.params.id },
            {
                $set: req.body,
            }
        );
        resp.send(result);
    }
    catch (error) {
        resp.send({ status: error });
    }
});

// API TO DELETE THE JOB POSTING BY THE RECRUIER & ADMIN
router.delete('/delete-user', verifyToken, async (req, resp) => {
    const name = req.body.companyName;
    try {
        Jobs.deleteOne({ companyName: name }, function (err, obj) {
            if (err) throw err;
            resp.send({ status: "ok" });
        });
    }
    catch (error) {
        resp.send({ status: error });
    }
});

// JWT TOKEN VERIFICATION FUNCTION FOR TWO-WAY AUTHENTICATION
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