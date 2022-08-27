import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './css/reset.css';
import './css/index.css';
import './css/card.css';
import './css/modal.css';
import './css/game.css';
import './css/map.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { ContextHero } from './context/Hero';
import { ContextGame } from './context/Game';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextGame>
      <ContextHero>
        <Router>
          <App />
        </Router>
      </ContextHero>
    </ContextGame>
  </React.StrictMode>
);
