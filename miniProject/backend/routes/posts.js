const express = require("express");
const db = require("../config/db");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({storage});

const router = express.Router();

router.post("/newposts", upload.single("image"), (req, res) => {

if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
}
  const { title, tag, description } = req.body;
  const userId = req.session.user.id;
  let imageUrl = null;
    if (req.file) {
       imageUrl = "/uploads/" + req.file.filename;
    }
  db.query(
    "INSERT INTO posts (title, image, tag, description, user_id) VALUES (?, ?, ?, ?, ?)",
    [title ,imageUrl, tag, description, userId],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Post created" });
    }
  );
});


router.get("/allposts", (req, res) => {
  db.query(
    `
    SELECT posts.*, users.fullname,
    (SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS like_count,
    (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) AS comment_count
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
    `,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
});

router.delete("/:postId", (req, res) => {
  const { postId } = req.params;

  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const user_id = req.session.user.id;

  db.query(
    "DELETE FROM posts WHERE id = ? AND user_id = ?",
    [postId, user_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.affectedRows === 0) {
        return res.status(403).json({ message: "Not your post" });
      }

      res.json({ message: "Post deleted" });
    }
  );
});


router.put("/:id", upload.single("image"),(req, res) => {
  const { description, deleteImage } = req.body;
  const postId = req.params.id;

  let query = `UPDATE posts SET description = ?`;
  const params = [description];

  if (req.file) {
    const imageUrl = "/uploads/" + req.file.filename;
    query += `, image = ?`;
    params.push(imageUrl);
  }


  else if (deleteImage === "true") {
    query += `, image = NULL`;
  }

  query += ` WHERE id = ?`;
  params.push(postId);

  db.query(query, params, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Update failed" });
    }

    res.json({ message: "Post updated" });
  });
});

module.exports = router;