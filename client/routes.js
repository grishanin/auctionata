import React from 'react';
import { Route, /* IndexRoute */ } from 'react-router';

import App from './containers/App';
import AuctionContainer from './containers/AuctionContainer';

export default (
  <Route path='/' component={App}>
    <Route path='auctions/:auctionId' component={AuctionContainer}></Route>
  </Route>
);
