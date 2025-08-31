import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter> {/* Envolva o App com BrowserRouter */}
            <App />
        </BrowserRouter>
    </StrictMode>
);