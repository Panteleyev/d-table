/**
 * Компонент текстового поля
 */
import React, {Component} from 'react'
import {func, string} from 'prop-types';
import {MAX_LENGTH} from '../common/settings';

class Input extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      value: props.value,
    };
  }

  componentDidCatch(error, info) {
    this.setState({error, info});
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  /**
   * Обработчик изменения значения
   * @param e
   */
  handleChange = e => {
    this.setState({value: e.target.value});
  };

  /**
   * Обработчик потери фокуса
   * @param e
   */
  handleBlur = e => {
    this.setState({value: e.target.value});
    this.triggerChange();
  };

  /**
   * Обработчик зажатия клавиши
   * @param e
   */
  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.triggerChange();
    }
  };

  /**
   * Триггер вызова изменения значения
   */
  triggerChange = () => {
    this.props.onChange(this.state.value);
  };

  render() {
    if (this.state.info && this.state.info.componentStack) {
      console.log(this.state.info.componentStack);
    }

    if (this.state.error) {
      return <h2>Error: {this.state.error.toString()}</h2>;
    }

    const {
      placeholder,
    } = this.props;

    return (
      <input
        type="text"
        placeholder={placeholder}
        value={this.state.value}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        maxLength={MAX_LENGTH}
      />
    )
  }
}

Input.propTypes = {
  value: string.isRequired,
  placeholder: string,
  onChange: func.isRequired,
};

export default Input;