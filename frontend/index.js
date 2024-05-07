// 👉 DO NOT CHANGE THIS FILE 👈
// 👉 DO NOT CHANGE THIS FILE 👈
// 👉 DO NOT CHANGE THIS FILE 👈

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import './styles/reset.css';
import './styles/styles.css';
import { createRoot } from 'react-dom/client';

// Find the root element in your HTML
const rootElement = document.getElementById('root');
// Create a root
const root = createRoot(rootElement);

// Render your app within the root
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
