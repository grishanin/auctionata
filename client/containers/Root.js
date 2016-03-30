import React, { Component } from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

export default class Root extends Component {
  render() {
    const { store, routes } = this.props;

    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </Provider>
    );
  }
}
