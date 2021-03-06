/**
 * Главный компонент приложения
 */
import React from 'react';
import styles from './App.scss';
import EditTable from './EditTable/EditTable';
import {getRandomInt} from './common/lib';
import Nav from './Nav/Nav';
import {ROWS_DEF_COUNT} from './common/settings';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      lastID: 0,
      error: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({error, info});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state !== nextState);
  }

  /**
   * Генератор массива со случайными значениями
   * @param {number} countRow - длина массива
   * @returns {{id: number, value1: string, value2: string}[]}
   */
  genRandomArray = countRow => Array.from(Array(countRow), (_, x) => ({
    id: x + 1,
    value1: 'Значение ' + getRandomInt(x, x + countRow),
    value2: 'Значение ' + getRandomInt(x, x + countRow),
  }));

  /**
   * Генератор строк со случайными значениями
   * @param {number} rowCount - количество строк
   * @returns {{rows: {id: number, value1: string, value2: string}[], lastID: number}}
   */
  genRows = rowCount => ({
    rows: this.genRandomArray(rowCount),
    lastID: rowCount,
  });

  /**
   * Регенератор строк со случайными значениями
   * @param {number} countRows - количество генерируемых строк
   */
  reGenRows = countRows => {
    this.setState({...this.genRows(countRows)});
  };

  /**
   * Обработчик добавления строки
   */
  onAddRow = () => {
    let _lastID = this.state.lastID;

    this.setState({
      rows: [
        ...this.state.rows,
        {
          id: ++_lastID,
          value1: '',
          value2: '',
        },
      ],
      lastID: _lastID,
    });
  };

  /**
   * Функция обновления значения
   * @param {object} changedRows - данных об обновленных значениях
   * @param {number} delIndexRow - номер строки
   */
  updateRow = (changedRows, delIndexRow) => {
    const rows = this.state.rows;
    let rowIndex, colIndex, rowData, value;

    for (rowIndex in changedRows) {
      if (changedRows.hasOwnProperty(rowIndex)) {
        rowData = changedRows[rowIndex];

        for (colIndex in rowData) {
          if (rowData.hasOwnProperty(colIndex)) {
            value = rowData[colIndex];

            rows[rowIndex]['value' + colIndex] = value;
          }
        }
      }
    }

    if (delIndexRow) {
      this.setState(
        {rows},
        () => {
          this.setState({
            rows: [...rows.slice(0, delIndexRow), ...rows.slice(delIndexRow + 1)]
          });
        }
      );
    } else {
      this.setState({rows});
    }
  };

  /**
   * Функция удаления строки
   * @param {number} rowIndex - номер строки
   */
  delRow = rowIndex => {
    const rows = this.state.rows;

    this.setState({
      rows: [...rows.slice(0, rowIndex), ...rows.slice(rowIndex + 1)]
    });
  };

  /**
   * Удаление всех строк
   */
  delAllRows = () => {
    this.reGenRows(0);
  };

  render() {
    if (this.state.info && this.state.info.componentStack) {
      console.log(this.state.info.componentStack);
    }

    if (this.state.error) {
      return <div className={styles.App}>
        <h2>Error: {this.state.error.toString()}</h2>
      </div>;
    }

    const {
      rows,
    } = this.state;

    return (
      <div className={styles.App}>
        <EditTable
          rows={rows}
          updateRow={this.updateRow}
          delRow={this.delRow}
        />
        <Nav
          onAddRow={this.onAddRow}
          reGenRows={() => this.reGenRows(ROWS_DEF_COUNT)}
          delAllRows={this.delAllRows}
        />
      </div>
    );
  }
}

export default App;