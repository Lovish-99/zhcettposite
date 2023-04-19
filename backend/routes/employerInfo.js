const router = require("express").Router();
const dotenv = require("dotenv");
const Jwt = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });
require("../db/config");
const Recruiter_Data = require("../models/Recruiter/CompanyData");

router.post("/add-data", verifyToken, async (req, resp) => {
    try {
        let recruiter = new Recruiter_Data(req.body);
        let result = await recruiter.save();
        resp.send(result);
    }
    catch (error) {
        resp.send({ status: error });
    }
});

router.get("/add-data/:id", verifyToken, async (req, resp) => {
    try {
        const data = await Recruiter_Data.findOne({ recruiterId: req.params.id });
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