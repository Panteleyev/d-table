/**
 * JS библиотека
 */
module.exports = {
  /**
   * Генератор случайного числового значения между min (включительно) и max (не включая max)
   * @param {number} min - минимальное значение
   * @param {number} max - максимальное значение
   * @returns {*}
   */
  getRandomInt: (min, max) => Math.floor(Math.random() * (max - min)) + min,
};