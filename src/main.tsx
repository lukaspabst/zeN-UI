import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './lib/styles/zen-tokens.css';
import { ZenThemeProvider } from './lib';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ZenThemeProvider defaultTheme="blackwall-crimson">
      <App />
    </ZenThemeProvider>
  </StrictMode>
);
