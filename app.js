const express = require("express");
const http = require("http");
const { connect } = require("http2");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

let connectedPeers = [];

io.on("connection", (socket) => {
  connectedPeers.push({ uid: socket.id });
  logPeers();

  socket.on("disconnect", () => {
    console.log(`User disconnected`);
    const newConnectedPeers = connectedPeers.filter((peer) => {
      peer.uid !== socket.id;
    });

    connectedPeers = newConnectedPeers;
    logPeers();
  });
});

// require("./custom_modules/IOHandler")(io);

server.listen(PORT, () => {
  console.log(`\n\tListening on port ${PORT}\n`);
});

function logPeers() {
  console.log(`\tConnected Peers ${connectedPeers.length}`);
}
