const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.post("/toggle", (req, res) => {
  const { post_id } = req.body;

  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const user_id = req.session.user.id;

  
  db.query(
    "SELECT * FROM likes WHERE user_id = ? AND post_id = ?",
    [user_id, post_id],
    (err, rows) => {
      if (err) return res.status(500).json(err);

      
      if (rows.length > 0) {
        db.query(
          "DELETE FROM likes WHERE user_id = ? AND post_id = ?",
          [user_id, post_id],
          (err) => {
            if (err) return res.status(500).json(err);
            res.json({ liked: false });
          }
        );
      }
      
      else {
        db.query(
          "INSERT INTO likes (user_id, post_id) VALUES (?, ?)",
          [user_id, post_id],
          (err) => {
            if (err) return res.status(500).json(err);
            res.json({ liked: true });
          }
        );
      }
    }
  );
});


router.get("/:postId", (req, res) => {
  const { postId } = req.params;
  const user_id = req.session.user?.id;

  db.query(
    `
    SELECT 
      COUNT(*) AS likeCount,
      SUM(user_id = ?) AS liked
    FROM likes
    WHERE post_id = ?
    `,
    [user_id, postId],
    (err, rows) => {
      if (err) return res.status(500).json(err);

      res.json({
        likeCount: rows[0].likeCount,
        liked: rows[0].liked > 0,
      });
    }
  );
});

module.exports = router;