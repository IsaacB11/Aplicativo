import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { ActivosContextProvider } from './context/ActivosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ActivosContextProvider>
      <App />
    </ActivosContextProvider>
  </React.StrictMode>
);
