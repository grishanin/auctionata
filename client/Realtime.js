import io from 'socket.io-client';

export function setupRealtime(store, actions) {
  const socket = io('http://localhost:8080/');

  socket.on('new bid placed', bidData => {
    console.log('new bid placed', bidData);
    store.dispatch(actions.receiveBid(bidData));
  });

  return socket;
}
