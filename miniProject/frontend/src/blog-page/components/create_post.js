import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem
 } from "@mui/material";
 import axios from "axios";


 export default function CreatePostDialog({ open, onClose, onPostCreated }) {
  const [tag, setTag] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [title, setTitle] = React.useState("");


  const resetForm = () => {
    setTitle("");
    setTag("");
    setDescription("");
    setImage(null);
    setPreview(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleImageChange = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file)); 
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tag", tag);
    formData.append("description", description);
    formData.append("image", image);

    await axios.post(
      "http://localhost:5000/api/posts/newposts",
      formData,
      { withCredentials: true }
    );

    resetForm();  
    onPostCreated(); 
    onClose();       
  };

  return (
    <Dialog 
    open={open} 
    onClose={handleClose} 
    fullWidth
    maxWidth="sm"
    BackdropProps={{
    sx: {
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0,0,0,0.6)"
    }
    }}
    >
      <DialogTitle>Create New Post</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          multiline
          rows={3}
          InputLabelProps={{ shrink: true }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          inputProps={{ maxLength: 100 }}
          sx={{
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

        <TextField
          select
          fullWidth
          label="Tag"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          margin="normal"
          sx={{
            "& .MuiInputBase-root": {
            height: "40px"
            },
            "& .MuiInputLabel-root": {
            transform: "translate(14px, -18px) scale(0.75)" 
            },
            "& .MuiOutlinedInput-root": {
            borderRadius: "16px"
            }
          }}
        >
          <MenuItem value="Engineer">Engineer</MenuItem>
          <MenuItem value="Dialy Life">Dialy Life</MenuItem>
          <MenuItem value="Travel">Travel</MenuItem>
          <MenuItem value="Music">Music</MenuItem>
        </TextField>

        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          minRows={3}
          maxRows={10}
          InputLabelProps={{ shrink: true }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          sx={{
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

        <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Upload Image
        <input
            type="file"
            hidden
            onChange={(e) => handleImageChange(e.target.files[0])}
        />
        </Button>
        {preview && (
          <Box mt={2} textAlign="center">
            <Typography variant="body2" sx={{ mb: 1 }}>
              Preview
            </Typography>
            <img
              src={preview}
              alt="preview"
              style={{
                maxWidth: "100%",
                borderRadius: "12px",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)"
              }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
}  