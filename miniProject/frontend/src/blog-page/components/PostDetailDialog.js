import * as React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Avatar,
  TextField,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function PostDetailDialog({
  open,
  onClose,
  post,
  user,
  onUpdated
}){
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(0);

  
    React.useEffect(() => {
    if (post) {
        axios
        .get(`http://localhost:5000/api/comments/${post.id}`, {
        withCredentials: true
    })
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
    }
    }, [post]);  


    React.useEffect(() => {
    if (post) {
        axios
        .get(`http://localhost:5000/api/likes/${post.id}`, {
        withCredentials: true
        })
        .then(res => {
        setLiked(res.data.liked);
        setLikeCount(res.data.likeCount);
        })
        .catch(err => console.error(err));
    }
    }, [post]);

    const handleLike = async () => {
    const res = await axios.post(
        "http://localhost:5000/api/likes/toggle",
        { post_id: post.id },
        { withCredentials: true }
    );

    setLiked(res.data.liked);

    setLikeCount(prev =>
    res.data.liked ? prev + 1 : prev - 1
    );

    onUpdated();

    };

    const handleSendComment = async () => {
        if (!comment.trim()) return;

        await axios.post(
        "http://localhost:5000/api/comments/send",
        {
        post_id: post.id,
        comment_text: comment
        },
        { withCredentials: true }
        );

    // โหลดใหม่
    const res = await axios.get(
    `http://localhost:5000/api/comments/${post.id}`
    );

    setComments(res.data);
    setComment("");

    onUpdated();
    };

    const handleDeleteComment = async (commentId) => {
        await axios.delete(
        `http://localhost:5000/api/comments/${commentId}`,
        { withCredentials: true }
        );

        // โหลดใหม่
        const res = await axios.get(
        `http://localhost:5000/api/comments/${post.id}`
        );

        setComments(res.data);
        onUpdated();
        };


  if (!post) return null;

  const isOwner = user?.id === post.user_id;
  const isLoggedIn = !!user;

  return (
    
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogContent sx={{ display: "flex", gap: 2 }}>

        {/* รูป */}
        <Box sx={{ flex: 1 }}>
          <img
            src={`http://localhost:5000${post.image}`}
            style={{ width: "100%" }}
            alt=""
          />
        </Box>

        {/* รายละเอียด */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Avatar>{post.fullname?.[0]}</Avatar>
              <Typography>{post.fullname}</Typography>
            </Box>

            {/* ปุ่ม 3 จุด เฉพาะเจ้าของ */}
            {isOwner && (
              <IconButton
                sx={{
                    border: "none",
                    background: "none",
                    boxShadow: "none",
                    padding: 0,
                    "&:hover": {
                    background: "none"
                    }
                }}
              >
                <MoreVertIcon />
              </IconButton>
            )}
          </Box>

          {/* Caption */}
          <Typography>{post.description}</Typography>

          {/* Like */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
  
          <IconButton 
          onClick={handleLike} 
          disabled={!isLoggedIn}
          sx={{
            border: "none",
            background: "none",
            boxShadow: "none",
            padding: 0,
            "&:hover": {
            background: "none"
            }
          }}          
          >
          {liked ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
          </IconButton>

          <Typography>{likeCount}</Typography>

          </Box>

        <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
        {comments.map((c) => {
        const isCommentOwner = user?.id === c.user_id;

        return (
          <Box key={c.id} sx={{ display: "flex", gap: 1, mb: 1 }}>
          <Avatar>{c.fullname?.[0]}</Avatar>

          <Box sx={{ flex: 1 }}>
          <Typography variant="caption" fontWeight="bold">
           {c.fullname}
          </Typography>

          <Typography variant="body2">
           {c.comment_text}
          </Typography>

          <Typography variant="caption" color="text.secondary">
           {new Date(c.created_at).toLocaleString()}
          </Typography>
          </Box>

          {/* 🔥 ปุ่มลบ เฉพาะเจ้าของ */}
          {isCommentOwner && (
           <IconButton
            size="small"
            onClick={() => handleDeleteComment(c.id)}
                sx={{
                    border: "none",
                    background: "none",
                    boxShadow: "none",
                    padding: 0,
                    "&:hover": {
                    background: "none"
                    }
                }}
           >
           <DeleteOutlineIcon fontSize="small" />
           </IconButton>
      )}
    </Box>
  );
})}
        </Box>
          {/* Comment */}
          {isLoggedIn && (
          <TextField 
          placeholder="Add a comment..." 
          size="small"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                <IconButton 
                onClick={handleSendComment}
                sx={{
                    border: "none",
                    background: "none",
                    boxShadow: "none",
                    padding: 0,
                    "&:hover": {
                    background: "none"
                    }
                }}
                >
                <SendIcon />
                </IconButton>
                </InputAdornment>
            )
          }}
          />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}