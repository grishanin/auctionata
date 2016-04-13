import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext, match } from 'react-router';
import routes from '../client/routes';

import configureStore from '../client/store/configureStore';

export function render(req, res) {
  match({
    routes,
    location: req.url
  }, (error, redirectLocation, renderProps) => {
    if (error)  {
      console.log('Error', error);
      res.status(400);
      res.send(error);
    } else if (redirectLocation) {
      res.redirect(redirectLocation);
    } else if (renderProps) {
      const initialState = {
        user: '',
        selectedAuction: ''
      };
      const store = configureStore(initialState);
      // Render the component to a string
      const html = ReactDOMServer.renderToString(
        <Provider store={store}>
         <RouterContext {...renderProps} />
        </Provider>
      );
      res.render('index', {
        app: html,
        assets: res.locals.webpack_asset('main').js,
        initialState: JSON.stringify(initialState)
      });
    } else {
      res.status(404).send('Not found');
    }
  });
}
