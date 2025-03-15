import React, { useContext, useEffect, useState } from "react";
import Chat from "./Chat";
import UserContext from "../context/UserContext";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
const ChatMessage = () => {
  const { user, chatUser, setChatUser, messageId } = useContext(UserContext);
  useEffect(() => {
    console.log("🚀 ~ ChatMessage ~ messageId:", messageId);
    console.log("🚀 ~ ChatMessage ~ chatUser:", chatUser);
  }, [chatUser]);
  const [input, setInput] = useState("");
  const [active, setActive] = useState(true);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || !messageId) return; // Prevent empty messages

    try {
      const messageRef = doc(db, "messages", messageId);

      await updateDoc(messageRef, {
        messages: arrayUnion({
          senderId: user.id,
          text: input.trim(),
          createdAt: new Date(),
        }),
      });

      // Update last message in chat
      const userIDs = [user.id, chatUser.id];

      await Promise.all(
        userIDs.map(async (id) => {
          const userChatRef = doc(db, "chats", id);
          const userChatDoc = await getDoc(userChatRef);

          if (userChatDoc.exists()) {
            let userChatData = userChatDoc.data();

            const chatIndex = userChatData.chatData.findIndex(
              (c) => c.messageId === messageId
            );

            if (chatIndex !== -1) {
              userChatData.chatData[chatIndex] = {
                ...userChatData.chatData[chatIndex],
                lastMessage: input.slice(0, 30),
                updatedAt: Date.now(),
                messageSeen: id === user.id, // Only mark seen for the sender
              };

              await updateDoc(userChatRef, { chatData: userChatData.chatData });
            }
          }
        })
      );
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setInput(() => "");
    }
  };

  return (
    <div className=" flex flex-col justify-between w-full items-center bg-transparent max-h-[90vh]">
      {chatUser ? (
        <div className="bg-white w-full flex flex-col justify-center">
          <header className="flex flex-row h-[8vh] w-full items-center justify-between  bg-[#194478]">
            <div className="flex flex-row justify-center items-center">
              <img
                src={chatUser?.dp || "/profile.png"}
                alt=""
                className="h-15 w-15 p-2 rounded-full"
              />
              <span className="text-xl text-white font-semibold uppercase">
                {chatUser.username}
              </span>
              <span
                className={`text-5xl mb-2 ${
                  active ? "text-green-400" : "text-red-700"
                }`}
              >
                •
              </span>
            </div>
            <img
              src="/close.png"
              alt="close"
              className="h-15 w-15 p-3 invert-100"
              onClick={() => setChatUser("")}
            />
          </header>
          <div className="h-[72vh]">
            <Chat />
          </div>
          <form
            className="flex justify-between w-[80%] self-center mb-3 bg-gray-200 rounded-4xl p-2 shadow-md"
            onSubmit={sendMessage}
          >
            <input
              type="text"
              placeholder="Start Typing..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent px-5 text-gray-800 placeholder-gray-500 outline-none"
            />
            <button type="submit">
              <img
                src="/dm.png"
                alt="DM"
                className="h-10 w-12 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center bg-transparent items-center">
          Start a new chat
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
