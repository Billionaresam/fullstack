import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  createElement(
    StrictMode,
    null,
    createElement(App)
  )
);
