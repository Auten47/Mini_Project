const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json(req.session.user);
});

module.exports = router;