// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure you have this file or remove it if not needed
import App from './App';

// Rendering the root component (App) into the DOM element with id="root"
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
