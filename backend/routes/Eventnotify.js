const router = require("express").Router();
const dotenv = require("dotenv");
const Jwt = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });
require("../db/config");
const Events = require("../models/Notification/EventPost");

//APIS FOR JOB SCHEMA
router.post("/upload-event", verifyToken, async (req, resp) => {
    const {
        title,
        date,
        name,
        email,
        location,
        phone,
        supportiveDocs,
        description,
    } = req.body;
    try {
        await Events.create({
            title,
            date,
            name,
            email,
            location,
            phone,
            supportiveDocs,
            description,
        });
        resp.send({ Status: "ok" });
    } catch (error) {
        resp.send({ Status: "error", data: error });
    }
});

router.get("/get-event", verifyToken, async (req, resp) => {
    try {
        const data = await Events.find();
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

router.get("/get-event/:id", verifyToken, async (req, resp) => {
    try {
        const data = await Events.findOne({ _id: req.params.id });
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

router.put("/update-event/:id", verifyToken, async (req, resp) => {
    try {
        let result = await Events.updateOne(
            { _id: req.params.id },
            {
                $set: req.body,
            }
        );
        resp.send(result);
    }
    catch (error) {
        resp.send(error);
    }
});

router.delete('/delete-user', verifyToken, async (req, resp) => {
    const name = req.body.title;
    try {
        Events.deleteOne({ title: name }, function (err, obj) {
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