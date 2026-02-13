const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.post("/google-auth", (req, res) => {
  const { email, name } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0) {
            db.query(
            "INSERT INTO users (fullname, email) VALUES (?, ?)",
            [name, email],
            (err2) => {
                if(err2) return res.status(500).json(err2);
                createSession(req, res, email, name);
            }
        );
      } else{
        createSession(req, res, email, name);
      }
    }
  );
});

function createSession(req, res, email, name){
    req.session.user = {
        email,
        fullname: name,
    };

    res.json({
        message: "Google auth success",
        user: req.session.user,
    })
}

module.exports = router;