/**
 * Компонент навигатора
 */
import React from 'react';
import {func, string} from 'prop-types';
import styles from './Nav.scss';
import {
  BTN_ADD_TITLE, BTN_ADD_VALUE, BTN_REGEN_TITLE, BTN_REGEN_VALUE, COLORS,
} from '../common/settings';
import {getRandomInt} from '../common/lib';

const Nav = props => {
  const {
    onAddRow,
    reGenRows,
  } = props;
  const style = {
    borderColor: COLORS[getRandomInt(0, COLORS.length)],
  };

  return (
    <div className={styles.nav} style={style}>
      <input type="button" className={styles.add} onClick={onAddRow} value={BTN_ADD_VALUE} title={BTN_ADD_TITLE}/>
      <input type="button" className={styles['re-gen']} onClick={reGenRows} value={BTN_REGEN_VALUE}
             title={BTN_REGEN_TITLE}/>
    </div>
  );
};

Nav.propTypes = {
  onAddRow: func.isRequired,
  reGenRows: func.isRequired,
  className: string,
};

export default Nav;