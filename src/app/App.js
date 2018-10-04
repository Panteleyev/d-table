/**
 * Главный компонент приложения
 */
import React from 'react';
import styles from './App.scss';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error, info) {
    this.setState({error, info});
  }

  render() {
    if (this.state.info && this.state.info.componentStack) {
      console.log(this.state.info.componentStack);
    }

    if (this.state.error) {
      return <div className={styles.App}>
        <h2>Error: {this.state.error.toString()}</h2>
      </div>;
    }

    return (
      <div className={styles.App}>Hello!</div>
    );
  }
}

export default App;