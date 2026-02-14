  import * as React from 'react';
  import Avatar from '@mui/material/Avatar';
  import Box from '@mui/material/Box';
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';
  import CardMedia from '@mui/material/CardMedia';
  import Chip from '@mui/material/Chip';
  import Grid from '@mui/material/Grid';
  import IconButton from '@mui/material/IconButton';
  import Typography from '@mui/material/Typography';
  import FormControl from '@mui/material/FormControl';
  import InputAdornment from '@mui/material/InputAdornment';
  import OutlinedInput from '@mui/material/OutlinedInput';
  import { styled } from '@mui/material/styles';
  import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
  import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
  import axios from "axios";
  import AddIcon from "@mui/icons-material/Add";
  import Fab from '@mui/material/Fab';
  import CreatePostDialog from './create_post';
  import { useLocation } from "react-router-dom";
  import PostDetailDialog from "./PostDetailDialog";
  import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
  import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

  const stringAvatar = (name) => ({
      children: name ? name[0].toUpperCase() : "?",
    });

  const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    };
  const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    height: '100%',
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
      backgroundColor: 'transparent',
      cursor: 'pointer',
    },
    '&:focus-visible': {
      outline: '3px solid',
      outlineColor: 'hsla(210, 98%, 48%, 0.5)',
      outlineOffset: '2px',
    },
  }));

  const StyledCardContent = styled(CardContent)({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: 16,
    flexGrow: 1,
    '&:last-child': {
      paddingBottom: 16,
    },
  });

  const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });

  function Author({ fullname, createdAt }) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
        >
          <Avatar {...stringAvatar(fullname)} />
          <Typography variant="caption">
            {fullname}
          </Typography>
        </Box>
        <Typography variant="caption">{formatDate(createdAt)}</Typography>
      </Box>
    );
  }

  export function Search() {
    return (
      <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
        <OutlinedInput
          size="small"
          id="search"
          placeholder="Search…"
          sx={{ flexGrow: 1 }}
          startAdornment={
            <InputAdornment position="start" sx={{ color: 'text.primary' }}>
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          }
          inputProps={{
            'aria-label': 'search',
          }}
        />
      </FormControl>
    );
  }

  export default function MainContent() {
    const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
    const [posts, setPosts] = React.useState([]);
    const [openPostDialog, setOpenPostDialog] = React.useState(false);
    const [user, setUser] = React.useState(null);
    const location = useLocation();
    const [selectedPost, setSelectedPost] = React.useState(null);
    const [openDetail, setOpenDetail] = React.useState(false);


    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/posts/allposts",
          { withCredentials: true }
        );
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      });
      fetchPosts();
    }, [location]);

    const handleFocus = (index) => {
      setFocusedCardIndex(index);
    };

    const handleBlur = () => {
      setFocusedCardIndex(null);
    };

    const handleClick = () => {
      console.info('You clicked the filter chip.');
    };

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div>
          <Typography variant="h1" gutterBottom>
            Blog
          </Typography>
          <Typography>Stay in the loop with the latest about our products</Typography>
        </div>
        {user && (
          <Fab
          aria-label='add'
          sx={{
              backgroundColor: "rgba(120,120,120,0.25)",
              backdropFilter: "blur(10px)",
              color: 'white',
              position: 'fixed',
              bottom: 24,
              right: 24,
              "&:hover": {
                backgroundColor: "rgba(120,120,120,0.4)"
              }
              }}
                onClick={() => setOpenPostDialog(true)}
          >
            <AddIcon /> 
          </Fab>
        )}
        <CreatePostDialog
          open={openPostDialog}
          onClose={() => setOpenPostDialog(false)}
          onPostCreated={fetchPosts}
        />
        <Box
          sx={{
            display: { xs: 'flex', sm: 'none' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search />
          <IconButton size="small" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column-reverse', md: 'row' },
            width: '100%',
            justifyContent: 'space-between',
            alignItems: { xs: 'start', md: 'center' },
            gap: 4,
            overflow: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              flexDirection: 'row',
              gap: 3,
              overflow: 'auto',
            }}
          >
            <Chip onClick={handleClick} size="medium" label="All categories" />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Engineer"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Dialy Life"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Travel"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
            <Chip
              onClick={handleClick}
              size="medium"
              label="Music"
              sx={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
            />
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'row',
              gap: 1,
              width: { xs: '100%', md: 'fit-content' },
              overflow: 'auto',
            }}
          >
            <Search />
            <IconButton size="small" aria-label="RSS feed">
              <RssFeedRoundedIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Grid container spacing={2} columns={12}>
          {posts.map((post, index) => (
          <Grid key={post.id} size={{ xs: 12, md: 6 }}>
            <StyledCard
              variant="outlined"
              onFocus={() => handleFocus(0)}
              onBlur={handleBlur}
              tabIndex={0}
              className={focusedCardIndex === 0 ? 'Mui-focused' : ''}
              onClick={() => {
                setSelectedPost(post);
                setOpenDetail(true);
              }}
            >
              <CardMedia
                component="img"
                image={`http://localhost:5000${post.image}`}
                sx={{
                  aspectRatio: '16 / 9',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <StyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {post.tag}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {post.title}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                  {post.description}
                </StyledTypography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", mt: 1 }}>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <FavoriteBorderIcon fontSize="small" />
                <Typography variant="body2">{post.like_count}</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <ChatBubbleOutlineIcon fontSize="small" />
                <Typography variant="body2">{post.comment_count}</Typography>
                </Box>

              </Box>
              </StyledCardContent>
              <Author 
                fullname={post.fullname}
                createdAt={post.created_at}
              />
            </StyledCard>
          </Grid>
          ))}
        </Grid>
        <PostDetailDialog
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          post={selectedPost}
          user={user}
          onUpdated={fetchPosts}
        />
      </Box>
      
    );
  }
