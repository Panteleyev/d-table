/**
 * Библиотека PropTypes
 */
import {arrayOf, func, number, shape, string} from 'prop-types';

/**
 * PropTypes для компонента EditTable
 * @type {{rows: *, updateRow: *, delRow: *}}
 */
export const EDIT_TABLE_PROP_TYPES = {
  rows: arrayOf(
    shape({
      id: number,
      value2: string,
      value1: string
    })
  ).isRequired,
  updateRow: func.isRequired,
  delRow: func.isRequired,
};