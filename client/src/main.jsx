import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { LanguageProvider } from './context/LanguageContext';
import { ForecastProvider } from './context/ForecastContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <ForecastProvider>
          <App />
        </ForecastProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);
