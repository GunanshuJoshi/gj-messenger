import express from "express";
import http from "http"; // Import HTTP module
import { Server } from "socket.io"; // Import Socket.io
import cors from "cors";
import dotenv from "dotenv";
import ImageKit from "imagekit";
import { db } from "./firebaseConfig.js"; // Import Firestore configuration
import {
  collection,
  addDoc,
  updateDoc,
  arrayUnion,
  doc,
  getDoc,
} from "firebase/firestore";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: { origin: "*" }, // Allow all origins
});

app.use(cors());
app.use(express.json());

const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_API_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
});

// ImageKit Authentication Endpoint
app.get("/auth", async (req, res, next) => {
  try {
    const result = imagekit.getAuthenticationParameters();
    res.status(200).send(result);
  } catch (error) {
    next(new Error("Error generating upload authentication parameters"));
  }
});

// **Socket.io Chat Server**
const users = {}; // Store connected users

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // User joins with their ID
  socket.on("join", (userId) => {
    users[userId] = socket.id;
    io.emit("userStatus", users); // Notify all clients of active users
  });

  // Handle sending messages
  socket.on(
    "sendMessage",
    async ({ senderId, receiverId, text, messageId }) => {
      try {
        const messageData = { senderId, text, createdAt: new Date() };

        // Update Firestore messages collection
        await updateDoc(doc(db, "messages", messageId), {
          messages: arrayUnion(messageData),
        });

        // Send real-time message to the receiver
        if (users[receiverId]) {
          io.to(users[receiverId]).emit("receiveMessage", messageData);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  );

  // Handle disconnect
  socket.on("disconnect", () => {
    for (const userId in users) {
      if (users[userId] === socket.id) {
        delete users[userId];
        break;
      }
    }
    io.emit("userStatus", users); // Update online status
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
