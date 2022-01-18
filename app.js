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
  console.log(`\n\tClient ${socket.id} connected`);
  logPeers();

  socket.on("preoffer", (data) => {
    const { calleePersonalCode, callType } = data;

    console.log(
      `\n\tPreoffer sent by ${socket.id}\n\tData:\t${JSON.stringify(data)}`
    );

    const connectedPeer = connectedPeers.find(
      (x) => x.uid == calleePersonalCode
    );

    if (connectedPeer) {
      const data = {
        callerSocketId: socket.id,
        callType,
      };

      io.to(calleePersonalCode).emit("preoffer", data);
    }
  });

  socket.on("preofferanswer", (data) => {
    console.log(`\n\tPre offer answer came\n\tData: ${JSON.stringify(data)}`);

    const { callerSocketId, preOfferAnswer } = data;

    const connectedPeer = connectedPeers.find(
      (peer) => peer.uid == callerSocketId
    );

    if (connectedPeer) {
      io.to(callerSocketId).emit("preofferanswer", data);
    }
  });

  socket.on("disconnect", () => {
    console.log(`\n\tUser ${socket.id} disconnected`);
    const newConnectedPeers = connectedPeers.filter(
      (peer) => peer.uid !== socket.id
    );

    connectedPeers = newConnectedPeers;
    logPeers();
  });
});

// require("./custom_modules/IOHandler")(io);

server.listen(PORT, () => {
  console.clear();
  console.log(`\n\tListening on port ${PORT}\n`);
});

function logPeers() {
  console.log(`\n\tConnected Peers ${connectedPeers.length}`);
  if (connectedPeers.length > 0) {
    connectedPeers.forEach((p) => console.log(`\t\t${p.uid}`));
  }
}
