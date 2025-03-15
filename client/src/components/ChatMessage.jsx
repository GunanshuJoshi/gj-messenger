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

  const sendMessage = async () => {
    try {
      if (input && messageId) {
        await updateDoc(doc(db, "messages", messageId), {
          messages: arrayUnion({
            senderId: user.id,
            text: input,
            createdAt: new Date(),
          }),
        });
        const userIDs = [user.id, chatUser.id];
        userIDs.forEach(async (id) => {
          const userChatRef = doc(db, "chats", id);
          const userChatDoc = await getDoc(userChatRef);
          if (userChatDoc.exists()) {
            const userChatData = userChatDoc.data();
            console.log("🚀 ~ userIDs.forEach ~ userChatData:", userChatData);
            const chatIndex = userChatData.chatData.findIndex(
              (c) => c.messageId === messageId
            );
            userChatData.chatData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatData[chatIndex].secondUserId === chatUser.id) {
              userChatData.chatData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatRef, {
              chatData: userChatData.chatData,
            });
          }
        });
      }
    } catch (error) {
      console.log("🚀 ~ sendMessage ~ error:", error);
    } finally {
      setInput("");
    }
  };
  return (
    <div className=" flex flex-col justify-between items-center bg-transparent max-h-[90vh]">
      {chatUser ? (
        <div className="bg-white">
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
          <div className="flex justify-between w-[90%]  mb-3 bg-gray-200 rounded-4xl p-2 shadow-md">
            <img
              src="/link.png"
              alt="Link"
              className="h-10 w-12 cursor-pointer hover:opacity-80 transition-opacity"
            />

            <input
              type="text"
              placeholder="Start Typing..."
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-transparent px-5 text-gray-800 placeholder-gray-500 outline-none"
            />

            <img
              src="/dm.png"
              alt="DM"
              onClick={sendMessage}
              className="h-10 w-12 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
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
