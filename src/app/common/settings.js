/**
 * Настройки приложения
 * @type {{ROWS_DEF_COUNT: number}}
 */

/**
 * Генерирумое количество строк
 */
export const ROWS_DEF_COUNT = 1000;

/**
 * Возможные цвета для тестирования ререндеринга
 */
export const COLORS = [
  '#FFFFFF',
  '#ffa770',
  '#c0ffc3',
  '#8d9cff',
  '#fffea1',
  '#ffb8d0',
  '#ccfaff',
];

/**
 * Максимальная длина значения в текствых полях
 */
export const MAX_LENGTH = 40;

/**
 * Плейсхолдер для текстовых полей
 */
export const DEF_PLACE_HOLDER = 'Введите значение';

/**
 * Надписи для нкопок
 */
export const BTN_DEL_VALUE = '❌';
export const BTN_ADD_VALUE = '➕';
export const BTN_REGEN_VALUE = '🔴';
export const BTN_CLEAR_VALUE = '❌';

/**
 * Подсказки для кнопок
 */
export const BTN_DEL_TITLE = 'Удалить';
export const BTN_ADD_TITLE = 'Добавить';
export const BTN_REGEN_TITLE = 'Cгенерировать таблицу';
export const BTN_CLEAR_TITLE = 'Очистить таблицу';

/**
 * Длительность минимальной задержки запуска ререндеринга после последнего изменения значения поля
 */
export const UPDATE_DELAY = 1500;