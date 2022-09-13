export const NULL = 'null';
export const ENEMY = 'enemy';
export const ITEM = 'item';
export const TRAP = 'trap';
export const BOSS = 'boss';
export const INIT = 'init';
export const CODE = 'code';
export const CHEST = 'chest';
export const WEAPON = 'weapon';

export const BOMB = 'bomb';

export const LEVEL_BASE = [NULL, ENEMY, TRAP, ITEM];
export const LEVEL_EASY = [NULL, ENEMY, ENEMY, ITEM, TRAP].concat(LEVEL_BASE);
export const LEVEL_MEDIUM = [NULL, ENEMY, ENEMY, ENEMY, ITEM].concat(
  LEVEL_BASE
);
// TEST
// export const LEVEL_EASY = [CODE, CHEST];

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

export const PURCHASED_ITEM = 'Item comprado com sucesso!';
export const PURCHASED_GUN = 'Arma comprada com sucesso!';

export const GIFT_PURCHASED_SUCCESSFULLY = 'Presente adquirido com sucesso!';
export const CHEST_HAS_BEEN_OPENED = 'O baú foi aberto!';
export const PASSWORD_IS_INCORRECT = 'A senha está incorreta!';

export const INSUFFICIENT_GOLD = 'Sem ouro insuficiente.';

export const NO_HERO_WAS_SELECTED = 'Nenhum herói foi selecionado.';

export const HERO_TURN_TO_PLAY = 'É a vez do herói de jogar.';
export const ENEMY_IS_ATTACKING = 'O inimigo está atacando ...';
export const HERO_WON = 'O herói venceu!';
export const ENEMY_WON = 'O inimigo venceu!';
export const HERO_HAS_BEEN_DEFEATED = 'O herói foi derrotado.';
export const ENEMY_HAS_BEEN_DEFEATED = 'O inimigo foi derrotado.';

export const NO_INFORMATION_AVAILABLE = 'Nenhuma informação disponível.';

export const DO_YOU_WANT_TO_RESTART = 'Deseja reiniciar o jogo?';
