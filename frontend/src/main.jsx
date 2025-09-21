import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { SensorProvider } from './context/SensorContext';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SensorProvider>
          <App />
          <Toaster position="top-right" />
        </SensorProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
