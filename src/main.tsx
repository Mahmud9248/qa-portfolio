import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/instrument-sans';
import '@fontsource/instrument-serif/400.css';
import '@fontsource/instrument-serif/400-italic.css';
import '@fontsource-variable/jetbrains-mono';
import './styles/global.css';
import App from './App';

const root = document.getElementById('root');

if (!root) throw new Error('Root element not found.');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
