import io from 'socket.io-client';

export function setupRealtime(store, actions) {
  const socket = io();

  socket.on('new bid placed', bidData => {
    console.log('new bid placed', bidData);
    store.dispatch(actions.receiveBid(bidData));
  });

  return socket;
}
