// generate random number from min to max
/**
 *
 * @param {int} min
 * @param {int} max
 * @returns int
 */
export const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
