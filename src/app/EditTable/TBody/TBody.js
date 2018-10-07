/**
 * Компонент тела таблицы
 */
import React, {Component} from 'react';
import {arrayOf, func, number, shape, string} from 'prop-types';
import HeaderCell from '../Cell/Cell';
import styles from './TBody.scss';
import TextInput from '../../TextInput/TextInput';
import {EDIT_TABLE_PROP_TYPES} from '../../common/globalPropTypes';
import {BTN_DEL_TITLE, BTN_DEL_VALUE, DEF_PLACE_HOLDER, UPDATE_DELAY} from '../../common/settings';

class TBody extends Component {
  constructor(props) {
    super(props);
    this.changeTimer = null;
    this.state = {
      changedRows: {},
      error: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({error, info});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      clearTimeout(this.changeTimer);
      this.setState({changedRows: {}});
    }
  }

  componentWillUnmount() {
    clearTimeout(this.changeTimer);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props !== nextProps);
  }

  /**
   * Обработчик удаления строик
   * @param e - event
   * @param {number} rowIndex - номер строки
   */
  onDelRow =
    (e, rowIndex) => {
      const changedRows = this.state.changedRows;

      clearTimeout(this.changeTimer);
      if (Object.keys(changedRows).length === 0) {
        this.props.delRow(rowIndex);
      } else {
        this.props.updateRow(changedRows, rowIndex);
      }
    };

  /**
   * Функция записи нового значения в список изменений, которые будут учтены при простое изменения за UPDATE_DELAY мсек
   * @param {string} value - значение
   * @param {number} rowIndex - номер строки
   * @param {number} colIndex - номер поля
   */
  doStateChangedCell = (value, rowIndex, colIndex) => {
    const changedRows = this.state.changedRows;

    if (!changedRows.hasOwnProperty(rowIndex)) {
      changedRows[rowIndex] = {};
    }

    changedRows[rowIndex][colIndex] = value;
    this.setState({changedRows});
  };

  /**
   * Обработчик изменения значения текстового поля. Минимум через UPDATE_DELAY мсек запускается ререндеринг
   * @param {string} value - значение
   * @param {number} rowIndex - номер строки
   * @param {number} colIndex - номер поля
   */
  handleChange = (value, rowIndex, colIndex) => {
    const changedRows = this.state.changedRows;

    // прерываем таймер ожидания на разрешение ререндеринга
    clearTimeout(this.changeTimer);

    // записываем обновленное значение в список изменений, которые будут учтены при простое изменения за UPDATE_DELAY мсек
    this.doStateChangedCell(value, rowIndex, colIndex);

    // и запускаем таймер ожидания на разрешение ререндеринга
    this.changeTimer = setTimeout(
      () => {
        this.props.updateRow(changedRows);
      },
      UPDATE_DELAY
    );
  };

  render() {
    if (this.state.info && this.state.info.componentStack) {
      console.log(this.state.info.componentStack);
    }

    if (this.state.error) {
      return <h2>Error: {this.state.error.toString()}</h2>;
    }

    const {
      rows,
    } = this.props;

    return (
      <tbody className={styles['t-body']}>
      {rows.map((rowData, rowIndex) => {
        const uniqID = rowData.id;
        const inputEditID1 = `ed1_${rowIndex}`;
        const inputEditValue1 = rowData.value1;
        const inputEditID2 = `ed2_${rowIndex}`;
        const inputEditValue2 = rowData.value2;

        return (
          <tr key={rowIndex}>
            <HeaderCell key={`${rowIndex}.1`} value={`${uniqID}`}>{uniqID}</HeaderCell>
            <HeaderCell key={`${rowIndex}.2`} value={inputEditValue1}>
              <label htmlFor={inputEditID1}>{inputEditValue1}</label>
              <TextInput
                id={inputEditID1}
                placeholder={DEF_PLACE_HOLDER}
                value={inputEditValue1}
                onChange={value => this.handleChange(value, rowIndex, 1)}
              />
            </HeaderCell>
            <HeaderCell key={`${rowIndex}.3`} value={inputEditValue2}>
              <label htmlFor={inputEditID2}>{inputEditValue2}</label>
              <TextInput
                id={inputEditID2}
                placeholder={DEF_PLACE_HOLDER}
                value={inputEditValue2}
                onChange={value => this.handleChange(value, rowIndex, 2)}
              />
            </HeaderCell>
            <HeaderCell key={`${rowIndex}.4`} value={BTN_DEL_VALUE}>
              <input type="button" key={`${rowIndex}.4.1`} onClick={e => this.onDelRow(e, rowIndex)}
                     value={BTN_DEL_VALUE} title={BTN_DEL_TITLE}/>
            </HeaderCell>
          </tr>
        )
      })}
      </tbody>
    )
  }
}

TBody.propTypes = {
  ...EDIT_TABLE_PROP_TYPES,
};

export default TBody;