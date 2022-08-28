import React, { useState, useEffect } from 'react';

import heroes_api from '../api/heroes.json';
import items_api from '../api/items.json';
import maps_api from '../api/maps.json';
import enemies_api from '../api/enemies.json';

const GameContext = React.createContext();
const GameProvider = GameContext.Provider;

const ContextGame = ({ children }) => {
  const [heroes, setHeroes] = useState([]);
  const [items, setItems] = useState([]);
  const [maps, setMaps] = useState([]);
  const [enemies, setEnemies] = useState([]);

  // dados das posicoes
  const [enemy, setEnemy] = useState(null);
  const [item, setItem] = useState(null);

  // log da luta
  const [fightLog, setFightLog] = useState([]);

  // mapa selecionado
  const [map, setMap] = useState(null);

  // estado do jogo
  const [game, setGame] = useState({
    map: null,
    mapPositions: 0,
    mapLength: 0,
    heroPosition: 0,
    end: false,
  });

  // estado da luta
  const [fight, setFight] = useState({
    round: 0,
    modalInventory: false,
    end: false,
    turn: 0,
    winner: null,
  });

  const resetGame = () => {
    setGame({
      map: null,
      mapPositions: 0,
      mapLength: 0,
      heroPosition: 0,
      end: false,
    });
  };

  const resetFight = () => {
    setFight({
      round: 0,
      modalInventory: false,
      end: false,
      turn: 0,
      winner: null,
    });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      // carregar os itens da api
      if (heroes.length === 0) setHeroes(heroes_api);
      // carregar os herois da api
      if (items.length === 0) setItems(items_api);
      // carregar os mapas da api
      if (maps.length === 0) setMaps(maps_api);
      // carregar os inimigos da api
      if (enemies.length === 0) setEnemies(enemies_api);
    }
    return () => {
      mounted = false;
    };
  }, [heroes]);

  return (
    <GameProvider
      value={{
        heroes,
        items,
        maps,
        enemies,
        map,
        game,
        enemy,
        item,
        fight,
        fightLog,
        setMap,
        setGame,
        setFight,
        setEnemy,
        setItem,
        setFightLog,
        resetGame,
        resetFight,
      }}
    >
      {children}
    </GameProvider>
  );
};

export { GameContext, ContextGame };
