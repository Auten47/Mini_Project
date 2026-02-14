import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientIdGooGle = '96793548207-0pekgvjjddndhpm8c7puiis06igshmam.apps.googleusercontent.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientIdGooGle}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);

