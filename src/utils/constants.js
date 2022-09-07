export const NULL = 'null';
export const ENEMY = 'enemy';
export const ITEM = 'item';
export const TRAP = 'trap';
export const BOSS = 'boss';
export const INIT = 'init';

export const BOMB = 'bomb';

export const LEVEL_BASE = [NULL, ENEMY, TRAP, ITEM];
export const LEVEL_EASY = [ENEMY, ENEMY].concat(LEVEL_BASE);
export const LEVEL_MEDIUM = [NULL, ENEMY, ENEMY, ENEMY, ITEM].concat(
  LEVEL_BASE
);
export const LEVEL_HARD = 'hard';

export const MANA = 'mana';
export const HEALTH = 'health';
export const POISON = 'poison';

export const SUCCESS = 'success';
export const WARNING = 'warning';
export const ERROR = 'error';

export const URL_IMG = 'http://localhost:3000/images/';
export const URL_IMG_GH =
  'https://raw.githubusercontent.com/eduardo239/card-game/main/public/images/';
export const URL_EMP = 'empty_card.png';
export const URL_UNK = 'unknow_card.png';
