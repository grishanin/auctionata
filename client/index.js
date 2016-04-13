import React from 'react';
import { render } from 'react-dom';

import configureStore from './store/configureStore';
import Root from './containers/Root';
import routes from './routes';
import * as actions from './actions';
import { setupRealtime } from './Realtime';

import '../css/main.less';

const initialState = window.INITIAL_STATE;
const store = configureStore(initialState);

render(
  <Root store={store} routes={routes}/>,
  document.getElementById('root')
);

// Listen for server events and dispatch appropriate actions
setupRealtime(store, actions);
