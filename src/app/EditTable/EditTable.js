/**
 * Компонент таблицы
 */
import React from 'react';
import {arrayOf, shape, number, string, func} from 'prop-types';
import styles from './EditTable.scss';
import HeaderCell from './Cell/Cell';
import TBody from './TBody/TBody';
import {EDIT_TABLE_PROP_TYPES} from '../common/globalPropTypes';

class EditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({error, info});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.props !== nextProps);
  }

  render() {
    if (this.state.info && this.state.info.componentStack) {
      console.log(this.state.info.componentStack);
    }

    if (this.state.error) {
      return <h2>Error: {this.state.error.toString()}</h2>;
    }

    const {
      ...props
    } = this.props;

    return (
      <table className={styles.table}>
        <thead>
        <tr>
          <HeaderCell isTh={true} value="ID">ID</HeaderCell>
          <HeaderCell isTh={true} value="Значение 1">Значение 1</HeaderCell>
          <HeaderCell isTh={true} value="Значение 2">Значение 2</HeaderCell>
          <HeaderCell isTh={true} value="-" updateRow={props.updateRow}/>
        </tr>
        </thead>
        {props.rows.length > 0 && <TBody {...props}/>}
      </table>
    )
  }
}

EditTable.propTypes = {
  ...EDIT_TABLE_PROP_TYPES,
};

export default EditTable;