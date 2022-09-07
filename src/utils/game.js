import {
  BOSS,
  ENEMY,
  ITEM,
  LEVEL_EASY,
  NULL,
  TRAP,
  INIT,
  CODE,
  CHEST,
} from './constants';
import { v4 as uuidv4 } from 'uuid';

/**
 *
 * @param {Object} map necessário conter map.size
 * @param {Array} enemies array de inimigos
 * @param {Array} items array de itens
 * @returns retonrno uma array com posicoes aleatorias
 */
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

  // adicionar bau a uma posicao aleatoria
  let pos1 = Math.floor(Math.random() * positions.length);
  let pos2 = Math.floor(Math.random() * positions.length);

  if (pos1 === 0) pos1 += 1;
  if (pos2 === 0) pos2 += 2;
  if (pos1 === pos2) pos2 += 1;
  // TODO: validar bugs
  if (pos1 === positions.length - 1) pos1 -= 1;
  if (pos2 === positions.length - 1) pos2 -= 1;

  if (pos1 > pos2) {
    let x = pos1;
    pos1 = pos2;
    pos2 = x;
  }

  positions[pos1] = { code: { name: CODE }, id: uuidv4() };
  positions[pos2] = { chest: { name: CHEST }, id: uuidv4() };

  return positions;
};

/**
 *
 * @param {String} type tipo de mensagem, success, warning ou error
 * @param {String} message mensagem que aparecera no Toast
 * @param {function} setMessage funcao do useState, para resetar a mensagem
 * @param {integer} timer tempo em milisegundos
 */
export const messageHandler = (type, message, setMessage, timer = 3000) => {
  if (type && message && setMessage) {
    setMessage({
      type: type,
      content: message,
    });

    setTimeout(() => {
      setMessage({
        type: '',
        content: '',
      });
    }, timer);
  }
};
