const http = require("http");
const socketIo = require("socket.io");

const axios = require("axios");
const server = http.createServer();
const io = socketIo(server);
const sy_tracking = `http://localhost:6000`;
io.on("connection", (socket) => {
  console.log("Client connected to Socket.IO server (Server 2)");

  // socket.on("test_emit_android", (message) => {
  //   console.log(`Message from Express server (Server 1): ${message}`);
  //   io.emit("test_to_serverApi", message); // Broadcast the message to all connected clients on Server 2
  // });

  // socket.on("serverApi_to_socketServer", (message) => {
  //   console.log(`serverApi_to_socketServer success! : ${message}`);
  // });

  socket.on("tracking_start", async (data) => {
    console.log(`tracking_start`);
    try {
      const res = await axios.post(`${sy_tracking}/api/trackAlert`, {
        alert_id: data.alert_id,
      });
      console.log("res", res.data.message);
    } catch (error) {
      console.error("Error in tracking_start", error);
    }
  });
});

server.listen(4000, () => {
  console.log("Socket.IO server (Server 2) is listening on port 4000");
});
