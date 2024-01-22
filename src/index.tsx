import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from "./app/App";

import './styles.css';


const rootElement = document.getElementById('app');
const root = createRoot(rootElement!);

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);