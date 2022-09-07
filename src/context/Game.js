import React, { useState, useEffect } from 'react';

import heroes_api from '../api/heroes.json';
import items_api from '../api/items.json';
import maps_api from '../api/maps.json';
import enemies_api from '../api/enemies.json';
import magic_api from '../api/magic.json';
import weapons_api from '../api/weapons.json';
import traps_api from '../api/traps.json';
import chest_api from '../api/chest.json';

import { CHEST, ITEM, TRAP } from '../utils/constants';

const GameContext = React.createContext();
const GameProvider = GameContext.Provider;

const ContextGame = ({ children }) => {
  const [maps, setMaps] = useState([]);
  const [magic, setMagic] = useState([]);
  const [traps, setTraps] = useState([]);
  const [items, setItems] = useState([]);
  const [chests, setChests] = useState([]);
  const [heroes, setHeroes] = useState([]);
  const [weapons, setWeapos] = useState([]);
  const [enemies, setEnemies] = useState([]);

  // dados das posicoes
  const [item, setItem] = useState(null);
  const [enemy, setEnemy] = useState(null);

  // log da luta
  const [fightLog, setFightLog] = useState([]);

  // mapa selecionado
  const [map, setMap] = useState(null);

  // gift item
  const [randomItem, setRandomItem] = useState(null);
  const [randomTrap, setRandomTrap] = useState(null);
  const [randomChest, setRandomChest] = useState(null);

  // dice
  const [dice, setDice] = useState(0);

  // estado do jogo
  const [game, setGame] = useState({
    map: null,
    mapPositions: 0,
    mapLength: 0,
    heroPosition: 0,
    end: false,
    playing: false,
  });

  // estado da luta
  const [fight, setFight] = useState({
    round: 0,
    modalInventory: false,
    end: false,
    turn: 0,
    winner: null,
    heroAttack: false,
    enemyAttack: false,
  });

  const resetGame = () => {
    setGame({
      map: null,
      mapPositions: 0,
      mapLength: 0,
      heroPosition: 0,
      end: false,
      playing: false,
    });
  };

  const resetFight = () => {
    setFight({
      round: 0,
      modalInventory: false,
      end: false,
      turn: 0,
      winner: null,
      heroAttack: false,
      enemyAttack: false,
    });
  };

  const getRandomItem = arr => {
    switch (arr) {
      case ITEM:
        setRandomItem(items[Math.floor(Math.random() * items.length)]);
        break;
      case TRAP:
        setRandomTrap(traps[Math.floor(Math.random() * traps.length)]);
        break;
      case CHEST:
        setRandomChest(chests[Math.floor(Math.random() * chests.length)]);
        break;

      default:
        break;
    }
  };

  const resetRandomItem = () => setRandomItem(null);
  const resetRandomTrap = () => setRandomTrap(null);

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
      // carregar as armas da api
      if (weapons.length === 0) setWeapos(weapons_api);
      // carregar as magicas da api
      if (magic.length === 0) setMagic(magic_api);
      // carregar as traps da api
      if (traps.length === 0) setTraps(traps_api);
      // carregar os baus da api
      if (chests.length === 0) setChests(chest_api);
    }
    return () => {
      mounted = false;
    };
  }, [heroes, items, maps, enemies, weapons, magic]);

  return (
    <GameProvider
      value={{
        heroes,
        items,
        maps,
        enemies,
        map,
        weapons,
        magic,
        game,
        enemy,
        item,
        fight,
        fightLog,
        dice,
        setMap,
        setGame,
        setFight,
        setEnemy,
        setItem,
        setFightLog,
        resetGame,
        resetFight,
        randomItem,
        randomChest,
        randomTrap,
        resetRandomItem,
        resetRandomTrap,
        getRandomItem,
        setDice,
      }}
    >
      {children}
    </GameProvider>
  );
};

export { GameContext, ContextGame };
