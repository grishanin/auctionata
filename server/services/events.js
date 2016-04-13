export function liveUpdates(io) {
  return function (bidData) {
    io.emit('new bid placed', bidData);
  };
}
