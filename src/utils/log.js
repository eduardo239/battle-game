export const logEnemyDamage = damage => `O Inimigo provocou ${damage} de dano.`;
export const logHeroDamage = damage =>
  `O Herói atacou, provocando ${damage} de dano.`;
export const logHeroMagic = (type, damage) =>
  `O Herói usou ${type} e causou ${damage} de dano.;`;
export const logGoldRemoved = gold =>
  `Removido ${gold} de ouro e 0 de experiência!`;
export const logGoldRemovedAndExp = (gold, exp) =>
  `Removido ${gold} de ouro e ${exp} de experiência!`;
export const logHeroUsedPoison = (type, damage) =>
  `O herói usou ${type} e causou ${damage} de dano ao inimigo.`;
export const logHeroEquipped = data => `O herói equipou ${data}.`;
export const logHeroUsedHealing = (type, value) =>
  `O herói utilizou ${type} e curou ${value} de vida.`;
export const logHeroUsedMana = (type, value) =>
  `O herói utilizou ${type} e recuperou ${value} de mana.`;
