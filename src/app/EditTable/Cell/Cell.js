/**
 * Компонент ячейки таблицы
 */
import React, {Component} from 'react';
import {number, string, node, bool} from 'prop-types';
import styles from './Cell.scss';
import {COLORS} from '../../common/settings';

class Cell extends Component {
  constructor(props) {
    super(props);
    this.bgColorNumerVariant2 = 0;
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({error, info});
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.bgColorNumerVariant2 = this.bgColorNumerVariant2 < COLORS.length - 1 ? this.bgColorNumerVariant2 + 1 : 0;
      return true;
    }

    return false;
  }

  render() {
    if (this.state.info && this.state.info.componentStack) {
      console.log(this.state.info.componentStack);
    }

    if (this.state.error) {
      return <h2>Error: {this.state.error.toString()}</h2>;
    }

    const {
      children,
      isTh,
    } = this.props;
    const style = {
      backgroundColor: COLORS[this.bgColorNumerVariant2],
    };

    return isTh ?
      (<th className={styles.th} style={style}>{children}</th>)
      : (<td className={styles.td} style={style}>{children}</td>)
  }
}

Cell.propTypes = {
  value: string.isRequired,
  children: node,
  isTh: bool,
};

export default Cell;