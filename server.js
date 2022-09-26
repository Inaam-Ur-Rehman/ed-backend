const app = require("express")();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  // configure websocket transport
  cors: {
    origin: "https://ed-frontend-iota.vercel.app",
    methods: ["GET", "POST"],
  },
  allowEIO3: true,
});

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("get-document", (documentId) => {
    const data = "";
    socket.join(documentId);
    socket.emit("load-document", data);
    socket.on("send-changes", (data) => {
      socket.broadcast.to(documentId).emit("receive-changes", data);
    });
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
