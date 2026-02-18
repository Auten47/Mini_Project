import * as React from "react";
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Avatar,
  TextField,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [editDescription, setEditDescription] = React.useState("");
  const [deleteImage, setDeleteImage] = React.useState(false);
  const [newImage, setNewImage] = React.useState(null);
  const [openImageView, setOpenImageView] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [showImageAlert, setShowImageAlert] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const openMenu = Boolean(anchorEl);
  

const resizeImage = (file) => {
  return new Promise((resolve) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      const MAX_WIDTH = 1200;
      const scale = MAX_WIDTH / img.width;

      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => resolve(blob),
        "image/jpeg",
        0.8 // quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
};

const getImageUrl = (img) => {
  if (!img) return "";

  if (img.startsWith("http")) {
    return img; // Cloudinary
  }

  return `https://blog-backend-9eqd.onrender.com${img}`; // uploads
};
  
    React.useEffect(() => {
    if (post) {
        axios
        .get(`https://blog-backend-9eqd.onrender.com/api/comments/${post.id}`, {
        withCredentials: true
    })
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
    }
    }, [post]);  


    React.useEffect(() => {
    if (post) {
        axios
        .get(`https://blog-backend-9eqd.onrender.com/api/likes/${post.id}`, {
        withCredentials: true
        })
        .then(res => {
        setLiked(res.data.liked);
        setLikeCount(res.data.likeCount);
        })
        .catch(err => console.error(err));
    }
    }, [post]);
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleLike = async () => {
    const res = await axios.post(
        "https://blog-backend-9eqd.onrender.com/api/likes/toggle",
        { post_id: post.id },
        { withCredentials: true }
    );

    setLiked(res.data.liked);

    setLikeCount(prev =>
    res.data.liked ? prev + 1 : prev - 1
    );

    onUpdated();

    };

    React.useEffect(() => {
      setEditMode(false);
      setDeleteImage(false);
      setNewImage(null);
    }, [post]);

    const handleEditPost = () => {
      setEditDescription(post.description);
      setEditMode(true);
    };

    

const handleSaveEdit = async () => {
  if (deleteImage && !newImage) {
    setShowImageAlert(true);
    return;
  }

  try {
    setSaving(true);
    setProcessing(false); 
    setProgress(0);

    const formData = new FormData();
    formData.append("description", editDescription);
    formData.append("deleteImage", deleteImage);

    if (newImage) {
      formData.append("image", newImage);
    }

    await axios.put(
      `https://blog-backend-9eqd.onrender.com/api/posts/${post.id}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          const percent = Math.round(
            (event.loaded * 100) / event.total
          );
          setProgress(percent);

          if (percent === 100) {
              setProcessing(true); // phase 2
          }
        },
      }
    );

    setEditMode(false);
    onClose();
    onUpdated();

  } catch (err) {
    console.error(err);
  } finally {
    setSaving(false);
    setProcessing(false);
  }
};

    const handleDeletePost = () => {
      setOpenDeleteAlert(true);
    };

    const confirmDeletePost = async () => {
      await axios.delete(
      `https://blog-backend-9eqd.onrender.com/api/posts/${post.id}`,
      { withCredentials: true }
      );

      setOpenDeleteAlert(false);
      onClose();
      onUpdated(); 
    };

    const handleSendComment = async () => {
        if (!comment.trim()) return;

        await axios.post(
        "https://blog-backend-9eqd.onrender.com/api/comments/send",
        {
        post_id: post.id,
        comment_text: comment
        },
        { withCredentials: true }
        );

    // load
    const res = await axios.get(
    `https://blog-backend-9eqd.onrender.com/api/comments/${post.id}`
    );

    setComments(res.data);
    setComment("");

    onUpdated();
    };

    const handleCloseDialog = () => {
      setEditMode(false);
      setDeleteImage(false);
      setNewImage(null);
      onClose();
    };

    const handleDeleteComment = async (commentId) => {
        await axios.delete(
        `https://blog-backend-9eqd.onrender.com/api/comments/${commentId}`,
        { withCredentials: true }
        );

        // load
        const res = await axios.get(
        `https://blog-backend-9eqd.onrender.com/api/comments/${post.id}`
        );

        setComments(res.data);
        onUpdated();
        };


  if (!post) return null;

  const isOwner = user?.id === post.user_id;
  const isLoggedIn = !!user;

  return (
    
    <Dialog open={open} onClose={handleCloseDialog} maxWidth="md">
      <DialogContent sx={{ display: "flex", gap: 2 }}>
      {/* Delete Alert */}
      <Dialog
        open={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        PaperProps={{
          sx: {
            borderRadius: 3,
            textAlign: "center",
            p: 1
          }
        }}
      >
      <DialogTitle>Delete post?</DialogTitle>

      <DialogContent>
      <DialogContentText>
        Are you sure you want to delete this post?
      </DialogContentText>
    </DialogContent>

    <DialogActions sx={{ flexDirection: "column", gap: 1, px: 3 }}>
      <Button
        onClick={confirmDeletePost}
        fullWidth
        sx={{ color: "red", fontWeight: "bold" }}
      >
        Delete
      </Button>

      <Button
        onClick={() => setOpenDeleteAlert(false)}
        fullWidth
      >
        Cancel
      </Button>
    </DialogActions>
    </Dialog>

        {/* image */}
        <Box sx={{ position: "relative", width: "fit-content", margin: "auto", flex: 3 }}>
  
       {/* new image => preview*/}
       {newImage ? (
       <img
        src={URL.createObjectURL(newImage)}
        style={{
        maxWidth: "100%",
        height: "auto",
        display: "block",
        cursor: "zoom-in",
        }}
        onClick={() => setOpenImageView(true)}
        alt=""
       />
      ) : (
        !deleteImage && (
          <img
            src={getImageUrl(post.image)}
            style={{
            maxWidth: "100%",
            height: "auto",
            display: "block",
            cursor: "zoom-in"
            }}
            onClick={() => setOpenImageView(true)}
            alt=""
          />
        )
      )}

      {/* picture delete button*/}
      {editMode && (newImage || !deleteImage) && (
        <IconButton
          onClick={() => {
          setDeleteImage(true);
          setNewImage(null); // delete preview 
          }}
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white"
        }}
      >
      <DeleteIcon fontSize="small" />
      </IconButton>
      )}

      {/* Upload */}
      {editMode && (
        <Button
          component="label"
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(0,0,0,0.6)",
            color: "white",
            textTransform: "none"
          }}
        >
          Upload Image
        <input
          type="file"
          hidden
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;

              setDeleteImage(false);

              const compressed = await resizeImage(file);

              setNewImage(compressed);
          }}
        />
      </Button>
      )}
    </Box>
        {/* Detail */}
        <Box sx={{ flex: 2.5, display: "flex", flexDirection: "column", gap: 1}}>
          
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Avatar>{post.fullname?.[0]}</Avatar>
              <Typography>{post.fullname}</Typography>
            </Box>

            {/* Button dot. of Owner*/}
            {isOwner && (
              <>
              <IconButton 
                onClick={handleMenuClick}
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

              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => {
                  handleMenuClose();
                  handleEditPost();
                }}>
                  Edit
                </MenuItem>

                <MenuItem onClick={() => {
                  handleMenuClose();
                  handleDeletePost();
                }}>
                  Delete
                </MenuItem>
              </Menu>
              </>
            )}
          </Box>

          {/* Caption */}
          {editMode ? (
          <TextField
            fullWidth
            multiline
            variant="outlined"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            inputProps={{ maxLength: 255 }}
            margin="normal"
            sx={{
              "& textarea": {
              wordBreak: "break-word"
              },
              "& .MuiInputBase-root": {
              alignItems: "flex-start"
              },
              "& .MuiInputLabel-root": {
              transform: "translate(14px, -18px) scale(0.75)" 
              },
              "& .MuiOutlinedInput-root": {
              borderRadius: "16px"
              }
            }}
          />
          ) : (
            <Typography>{post.description}</Typography>
          )}

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

          {/* Delete Button of Owner */}
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); 
              handleSendComment();
            }
          }}
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

          {editMode && (
          <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={() => setEditMode(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSaveEdit}
          >
            Save
          </Button>
          </Box>
          )}
        </Box>

        {openImageView && (
        <Box
          onClick={() => setOpenImageView(false)}
          sx={{
            position: "fixed",
            inset: 0,
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999
          }}
        >
        <img
          src={
            newImage
              ? URL.createObjectURL(newImage)
              : getImageUrl(post.image)
          }
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 0 40px rgba(0,0,0,0.8)"
          }}
          alt=""
        />
        </Box>
        )}

        {/* Progress Dialog */}
        <Backdrop
          open={saving}
          sx={{
            color: "#fff",
            zIndex: 9999,
            backdropFilter: "blur(10px)", 
            backgroundColor: "rgba(0,0,0,0.4)", 
          }}
        >
        <Box
          sx={{
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            borderRadius: "20px",
            p: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            boxShadow: "0 0 40px rgba(0,0,0,0.5)",
          }}
        >
        <CircularProgress
          variant="determinate"
          value={progress}
          size={70}
          thickness={4}
          sx={{ color: "#fff" }}
        />

        <Typography fontWeight="bold">
          {processing ? "Processing..." : `${progress}%`}
        </Typography>

        <Typography variant="caption">
          {processing ? "Saving post..." : "Uploading..."}
        </Typography>
      </Box>
      </Backdrop>

      {/*Alert Image=null*/}
      <Backdrop
        open={showImageAlert}
        onClick={() => setShowImageAlert(false)}
        sx={{
          zIndex: 9999,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      >
    <Box
      sx={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(20px)",
        borderRadius: "16px",
        px: 5,
        py: 3,
        textAlign: "center",
        boxShadow: "0 0 40px rgba(0,0,0,0.7)",
      }}
    >
    <Typography
      fontWeight="bold"
      sx={{ color: "#fff", fontSize: 18 }}
    >
      Please upload an image before saving
    </Typography>

    <Typography
      variant="caption"
      sx={{ color: "#ccc" }}
    >
      You deleted the current image
    </Typography>
    </Box>
    </Backdrop>
      </DialogContent>
    </Dialog>
  );
}