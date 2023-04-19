const router = require("express").Router();
const dotenv = require("dotenv");
const Jwt = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });
require("../db/config");
const Images = require("../models/students/imageupload");

router.post("/upload-image", verifyToken, async (req, res) => {
    const { studentId, stdupload } = req.body;
    try {
        await Images.create({ studentId, stdupload });
        res.send({ Status: "ok" });
    } catch (error) {
        res.send({ Status: "error", data: error });
    }
});

router.get("/get-image/:id", verifyToken, async (req, resp) => {
    try {
        const data = await Images.findOne({ studentId: req.params.id });
        if (data) {
            resp.send({ status: "ok", data });
        } else {
            resp.send({ status: "error" });
        }
    }
    catch (error) {
        resp.send({ status: "error" });
    }
});

router.put("/update-image/:id", verifyToken, async (req, resp) => {
    try {
        let result = await Images.updateOne(
            { studentId: req.params.id },
            {
                $set: req.body,
            }
        );
        resp.send({status:'ok', result});
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

router.delete('/delete-doc', async (req, resp) => {
    const id = req.body.studentId;
    try {
        Images.deleteOne({ studentId: id }, function (err, obj) {
            if (err) throw err;
            resp.send({ status: "ok" });
        });
    }
    catch (error) {
        resp.send({ status: error });
    }
});

module.exports = router;