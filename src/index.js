import React from "react";
import {createRoot} from "react-dom/client";
import App from './components/App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/index.css';
import {HashRouter } from "react-router-dom";

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("No root element found");
}

createRoot(rootElement).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
