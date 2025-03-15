// Backend: server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { db } = require("./firebaseConfig"); // Assuming you use Firestore
const {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  getDoc,
} = require("firebase/firestore");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const users = {}; // Store connected users

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("join", (userId) => {
    users[userId] = socket.id;
    io.emit("userStatus", users);
  });

  socket.on(
    "sendMessage",
    async ({ senderId, receiverId, text, messageId }) => {
      const messageData = { senderId, text, createdAt: new Date() };
      await updateDoc(doc(db, "messages", messageId), {
        messages: arrayUnion(messageData),
      });

      if (users[receiverId]) {
        io.to(users[receiverId]).emit("receiveMessage", messageData);
      }
    }
  );

  socket.on("disconnect", () => {
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
    io.emit("userStatus", users);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
