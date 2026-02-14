import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import Sitemark from './SitemarkIcon';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = React.useState(false);
  

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
}, [location]);


const handleLogout = async () => {
  await axios.post(
    "http://localhost:5000/api/auth/logout",
    {},
    { withCredentials: true }
  );

  setUser(null);
  navigate("/");
};

  const handleMenu = (even) => {
      setAnchorEl(even.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const stringAvatar = (name) => {
    return {
      children: name ? name[0].toUpperCase() : "?",
    };
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small">
                Features
              </Button>
              <Button variant="text" color="info" size="small">
                Testimonials
              </Button>
              <Button variant="text" color="info" size="small">
                Highlights
              </Button>
              <Button variant="text" color="info" size="small">
                Pricing
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                FAQ
              </Button>
              <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                Blog
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
          {!user ?  (
            <>
              <Button 
                color="primary" 
                variant="text" 
                size="small" 
                onClick={() => navigate("/signin")}
              >
                Sign in
              </Button>
              <Button 
                color="primary" 
                variant="contained" 
                size="small"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </Button>
              </>
          ) : (
            <>
              <IconButton 
              onClick={handleMenu}
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
                <Avatar {...stringAvatar(user.name || user.fullname)} />
              </IconButton>

              <Menu 
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
              >
                <MenuItem disabled>{user.name || user.fullname}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={openDrawer}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                {!user ? (
                  <>
                  <MenuItem>
                  <Button 
                    color="primary" 
                    variant="contained" 
                    fullWidth
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </Button>
                  </MenuItem>
                  <MenuItem>
                  <Button 
                    color="primary" 
                    variant="outlined" 
                    fullWidth
                    onClick={() => navigate("/signin")}
                  >
                    Sign in
                  </Button>
                  </MenuItem>
                  </>
                ):(
                  <>
                  <MenuItem>
                  <Button fullWidth variant="text">
                    {user.name}
                  </Button>
                  </MenuItem>
                  <MenuItem>
                  <Button
                    color="error"
                    variant="outlined"
                    fullWidth
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                  </MenuItem>
                  </>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
