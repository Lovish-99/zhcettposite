const router = require("express").Router();
const dotenv = require("dotenv");
const Jwt = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });
require("../db/config");
const Student_Data = require("../models/students/Student_Data");
const CsvParser = require('json2csv').Parser;

// API TO DOWNLOAD ALL THE REGISTERED STUDENTS INFO IN CSV FILE FORM
router.get('/download-csv', async (req, res) => {
    try {
        console.log("api hit");
        const users = [];
        const data = await Student_Data.find();
        data.forEach((user) => {
            const { username, email } = user;
            const { department, course, faculty, enrollNum, mobNum, gender } = user.stdprofile;
            users.push({ username, email, department, course, faculty, enrollNum, mobNum, gender });
        });

        const Fields = ["Name", "Email", "Department", "Course", "Faculty No.", "Enrollment No.", "Phone", "Gender"];
        const csvParser = new CsvParser({ Fields });
        const csvData = csvParser.parse(users);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attatchment: filename=userData.csv");
        res.status(200).end(csvData);
    }
    catch (error) {
        res.status(500).send('Server Error');
    }
});


// API TO DOWNLOAD THE CSV FILE ACCORDING TO FITERED STUDENT
router.get("/download-csv/:course/:department?/:faculty?", verifyToken, async (req, res) => {
    try {
        console.log("api hit");
        const users = [];
        let data;
        if (req.params.faculty == "undefined" && req.params.department == "undefined") {
            data = await Student_Data.find({ "stdprofile.course": req.params.course });
        }
        else if (req.params.faculty == "undefined" && req.params.department != "undefined") {
            data = await Student_Data.find({
                "stdprofile.department": req.params.department,
                "stdprofile.course": req.params.course
            });
        }
        else if (req.params.faculty != "undefined" && req.params.department == "undefined") {
            data = await Student_Data.find({
                "stdprofile.course": req.params.course,
                "stdprofile.faculty": req.params.faculty
            });
        }
        else {
            data = await Student_Data.find({
                "stdprofile.department": req.params.department,
                "stdprofile.faculty": req.params.faculty,
                "stdprofile.course": req.params.course,
            });
        }
        data.forEach((user) => {
            const { username, email } = user;
            const { department, course, faculty, enrollNum, mobNum, gender } = user.stdprofile;
            users.push({ username, email, department, course, faculty, enrollNum, mobNum, gender });
        });

        const Fields = ["Name", "Email", "Department", "Course", "Faculty No.", "Enrollment No.", "Phone", "Gender"];
        const csvParser = new CsvParser({ Fields });
        const csvData = csvParser.parse(users);

        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attatchment: filename=userData.csv");
        res.status(200).end(csvData);
    }
    catch (error) {
        res.send({ status: error });
    }
});


//Experimental nested scheme
router.post("/add-data", verifyToken, async (req, resp) => {
    try {
        let student = new Student_Data(req.body);
        let result = await student.save();
        resp.send(result);
    }
    catch (error) {
        resp.send({ status: error });
    }
});

router.get("/add-data/:id", verifyToken, async (req, resp) => {
    try {
        const data = await Student_Data.findOne({ studentId: req.params.id });
        if (data) {
            resp.send({ status: "ok", data: { data } });
        } else {
            resp.send({ status: "error" });
        }
    }
    catch (error) {
        resp.send({ status: error });
    }
});

router.put("/update-data/:id", verifyToken, async (req, resp) => {
    try {
        const result = await Student_Data.updateOne(
            { studentId: req.params.id },
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

router.get("/add-data-qualify/:id", verifyToken, async (req, resp) => {
    try {
        const data = await Student_Data.find({ "stdeducat._id": req.params.id });
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

router.get("/get-student", verifyToken, async (req, resp) => {
    try {
        const data = await Student_Data.find();
        if (data) {
            resp.send({ status: "ok", data: { data } });
        } else {
            resp.send({ status: "error" });
        }
    }
    catch (error) {
        resp.send({ status: error });
    }
});

router.get("/get-student/:course/:department?/:faculty?", verifyToken, async (req, resp) => {
    try {
        console.log(req.params.department);
        console.log(req.params.faculty);
        if (req.params.faculty == "undefined" && req.params.department == "undefined") {
            const data = await Student_Data.find({ "stdprofile.course": req.params.course });
            if (data) {
                resp.send({ status: "ok", data: { data } });
            } else {
                resp.send({ status: "error" });
            }
        }
        else if (req.params.faculty == "undefined" && req.params.department != "undefined") {
            const data = await Student_Data.find({
                "stdprofile.department": req.params.department,
                "stdprofile.course": req.params.course
            });
            if (data) {
                resp.send({ status: "ok", data: { data } });
            } else {
                resp.send({ status: "error" });
            }
        }
        else if (req.params.faculty != "undefined" && req.params.department == "undefined") {
            const data = await Student_Data.find({
                "stdprofile.course": req.params.course,
                "stdprofile.faculty": req.params.faculty
            });
            if (data) {
                resp.send({ status: "ok", data: { data } });
            } else {
                resp.send({ status: "error" });
            }
        }
        else {
            const data = await Student_Data.find({
                "stdprofile.department": req.params.department,
                "stdprofile.faculty": req.params.faculty,
                "stdprofile.course": req.params.course,
            });
            if (data) {
                resp.send({ status: "ok", data: { data } });
            } else {
                resp.send({ status: "error" });
            }
        }
    }
    catch (error) {
        resp.send({ status: error });
    }
});

router.delete('/delete-user', verifyToken, async (req, resp) => {
    const email = req.body.email;
    try {
        Student_Data.deleteOne({ email: email }, function (err, obj) {
            if (err) throw err;
            resp.send({ status: "ok" });
        });
    }
    catch (error) {
        resp.send({ status: error });
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

module.exports = router;