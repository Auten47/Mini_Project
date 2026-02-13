const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.post("/register", (req, res) => {
    const {fullname, email, password} = req.body;

    db.query(
        "INSERT INTO users (fullname, email, password) VALUES(?,?,?)",
        [fullname, email, password],
        (err, result) => {
            if (err) return res.status(500).json(err);

            res.json({
                message: "Register success"
            });
        }
    );
});

module.exports = router;