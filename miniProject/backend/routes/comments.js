const express = require("express");
const db = require("../config/db");

const router = express.Router();

router.get("/:postId", (req, res) => {
  const { postId } = req.params;

  db.query(
    `
    SELECT 
      comments.id,
      comments.comment_text,
      comments.created_at,
      comments.user_id,
      users.fullname
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.post_id = ?
    ORDER BY comments.created_at DESC
    `,
    [postId],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.json(rows);
    }
  );
});

router.post("/send", (req, res) => {
  const { post_id, comment_text } = req.body;

  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const user_id = req.session.user.id;

  db.query(
    `
    INSERT INTO comments (post_id, user_id, comment_text)
    VALUES (?, ?, ?)
    `,
    [post_id, user_id, comment_text],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.json({ message: "Comment added" });
    }
  );
});


router.delete("/:commentId", (req, res) => {
  const { commentId } = req.params;

  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const user_id = req.session.user.id;

  db.query(
    `
    DELETE FROM comments
    WHERE id = ? AND user_id = ?
    `,
    [commentId, user_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(403).json({ message: "Not your comment" });
      }

      res.json({ message: "Comment deleted" });
    }
  );
});

module.exports = router;