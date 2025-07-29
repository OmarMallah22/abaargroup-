import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
// src/main.tsx (أو App.tsx)



// --- أضف هذين السطرين هنا ---
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
// --- ---

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)