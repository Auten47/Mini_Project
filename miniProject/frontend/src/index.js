import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          outline: "none",
          boxShadow: "none",
        },
      },
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

const GoogleClientId = '96793548207-0pekgvjjddndhpm8c7puiis06igshmam.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GoogleClientId}>
      <CssBaseline/>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

