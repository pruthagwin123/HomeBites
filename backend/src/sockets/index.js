function registerSocketHandlers(io) {
  io.on('connection', (socket) => {
    socket.on('tracking:join-order-room', (orderId) => {
      socket.join(`order-${orderId}`);
    });

    socket.on('disconnect', () => {
      // client disconnected
    });
  });
}

module.exports = { registerSocketHandlers };
