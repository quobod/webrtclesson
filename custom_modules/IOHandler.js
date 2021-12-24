const iohandler = (io) => {
  io.on("connection", (socket) => {
    console.log(`\n\tSocket ID ${socket.id} connected\n`);
  });
};

module.exports = (io) => iohandler(io);
