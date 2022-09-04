// generate random number from min to max
/**
 *
 * @param {int} min
 * @param {int} max
 * @returns int
 */
export const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

/**
 *
 * @param {Object} obj Valida se o objeto esta vazio
 * @returns
 */
export const isObjectEmpty = obj => {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
};

/**
 *
 * @param {int} base recebe o nivel atual do heroi
 * @returns inteiro com o total de experiencia para evoluir para o proximo nivel
 */
export const getNextLevel = base => {
  let con = 1.256;
  let nextLevel = Math.floor(con ** base * 100);
  return nextLevel;
};

// for (let x = 0; x < 100; x++) {
//   console.log(getNextLevel(x));
// }

export const diceAnimation = (setDice, setUpdatedDice) => {
  let _counter = 0;

  let interval = setInterval(() => {
    _counter += 1;

    setDice(random(1, 6));

    if (_counter >= 10) {
      clearInterval(interval);
      setUpdatedDice(true);
    }
  }, 100);
};
