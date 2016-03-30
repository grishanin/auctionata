import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config';
import jsonServer from 'json-server';
import * as eventService from './server/event';

import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;
const server = require('http').Server(app);

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json());

const io = require('socket.io').listen(server);
const emitBidUpdate = eventService.liveUpdates(io);

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

const router = jsonServer.router('./mock.json');
app.use('/api/v1', router);

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/html/index.html');
});

server.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
