const express = require("express");
const db = require("../config/db");

const router = express.Router();


router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

module.exports = router;