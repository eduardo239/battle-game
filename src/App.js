import React from 'react';
import { Route, Routes } from 'react-router';

import Start from './pages/Start';
import Hero from './pages/SelectHero';
import Item from './pages/SelectItem';
import Map from './pages/SelectMap';
import Game from './pages/Game';

function App() {
  return (
    <>
      <h2>CARD GAME!</h2>
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route exact path="/select-hero" element={<Hero />} />
        <Route exact path="/select-item" element={<Item />} />
        <Route exact path="/select-map" element={<Map />} />
        <Route exact path="/start-game" element={<Game />} />
      </Routes>
    </>
  );
}

export default App;
