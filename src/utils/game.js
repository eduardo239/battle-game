import { BOSS, ENEMY, ITEM, LEVEL_EASY, NULL, TRAP, INIT } from './constants';
import { v4 as uuidv4 } from 'uuid';

export const generatePositions = (map, enemies, items) => {
  let positions = [];

  for (let i = 0; i < map.size; i++) {
    // gera um valor aleatorio para cada posicao
    let key = [LEVEL_EASY[Math.floor(Math.random() * LEVEL_EASY.length)]];
    let value = '';
    // valida o tipo da posicao
    switch (key[0]) {
      case ENEMY:
        value = enemies[Math.floor(Math.random() * enemies.length)];
        break;
      case ITEM:
        value = items[Math.floor(Math.random() * items.length)];
        break;
      case TRAP:
        value = { name: 'trap' };
        break;
      case NULL:
        value = {};
        break;
      default:
        break;
    }

    positions.push({ [key]: value, id: uuidv4() });
  }

  positions[0] = { init: { name: INIT }, id: uuidv4() };
  positions[positions.length - 1] = { boss: { name: BOSS }, id: uuidv4() };

  return positions;
};
