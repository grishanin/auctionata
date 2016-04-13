import path from 'path';

import express from 'express';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import webpackAssets from 'express-webpack-assets';
import favicon from 'serve-favicon';
import jsonServer from 'json-server';

import config from '../config';
import * as eventsService from './services/events';
import { render } from './app';

const isDev = process.env.NODE_ENV !== 'production';
const app = express();

// View templates
app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars({
  defaultLayout: 'master',
  layoutsDir: path.resolve(__dirname, 'views/layouts')
}));
app.set('views', path.resolve(__dirname, 'views'));


app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, '..', 'favicon.ico')));
app.use('/build', express.static(path.resolve(__dirname, 'build')));
app.use(webpackAssets('./webpack-assets.json', {
    devMode: isDev
}));

const server = require('http').Server(app);

// === Bid plcaing mock
const io = require('socket.io').listen(server);
const emitBidUpdate = eventsService.liveUpdates(io);

// Placing new bid should be confirmed by server.
// As I didn’t use any real database I skipped these checks with mock
// and decided to notify clients about new bid immediately.
var catchBitPlacing = function(req, res, next) {
  const { bid, bidder } = req.body;
  emitBidUpdate({
    auctionId: req.params.id,
    bidder,
    bid
  });
  next();
};
app.patch('/api/v1/auctions/:id', catchBitPlacing);
// ===

const router = jsonServer.router('./mock.json');
app.use('/api/v1', router);
app.use(render);

if (config.port) {
  server.listen(config.port, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', config.port, config.port);
    }
  });
}
