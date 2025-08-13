import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.js';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    createElement(
      StrictMode,
      null,
      createElement(App, null)
    )
  );
} else {
  console.error("Root element not found. Make sure you have a <div id='root'></div> in your HTML.");
}
