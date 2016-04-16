import React from 'react';
import { render } from 'react-dom';

import configureStore from '../universal/store/configureStore';
import Root from './containers/Root';
import routes from '../universal/routes';
import * as actions from '../universal/actions';
import { setupRealtime } from './realtime';

import '../css/main.less';

const initialState = window.INITIAL_STATE;
const store = configureStore(initialState);

render(
  <Root store={store} routes={routes}/>,
  document.getElementById('root')
);

// Listen for server events and dispatch appropriate actions
setupRealtime(store, actions);
