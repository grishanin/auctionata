import React, { Component } from 'react';
import Header from '../containers/Header';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app__container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
