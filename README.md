### Description

This is a demo implementation of online auction written with React + Redux + Express  and Socket.io.

For this test task I decided to implement real-time bids update feature so I used JavaScript both on client and server and yes, it affect on scope I chose.

Server is based on Express and provides hot reloading, fake REST API, real-time communication.

Client is created in accordance with Flux/Redux approach, using ES6 features provided by Babel and Webpack.

### Executed features
- Viewing auction details
- Placing bids
- Real-time multiuser bids update

[json-server](https://github.com/typicode/json-server) package was used just for fast mocking REST API. For real world application it is surely better to use more reliable solutions and databases (MongoDB, RethinkDB).

Placing new bid should be confirmed by server. As I didn’t use any real database I skipped these checks with mock and decided to notify clients about new bid immediately.

It is possible to transform this application to universal (isomorphic), also to add [redux-router](https://github.com/acdlite/redux-router).

### Usage

```
npm install
npm start
open http://localhost:3000/
```
