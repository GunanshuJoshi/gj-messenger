import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const Chat = () => {
  const { messagesData, messageId, user, setMessagesData } =
    useContext(UserContext);

  useEffect(() => {
    if (!messageId) return;

    const unsubscribe = onSnapshot(doc(db, "messages", messageId), (res) => {
      if (res.exists()) {
        setMessagesData(
          res.data().messages.sort((a, b) => a.createdAt - b.createdAt)
        );
      }
    });

    return () => unsubscribe();
  }, [messageId]);

  return (
    <div className="overflow-auto h-full space-y-4 flex flex-col p-4">
      {messagesData &&
        messagesData.map((msg, index) => (
          <div
            key={index}
            className={`flex items-center ${
              msg.senderId === user.id ? "justify-end" : "justify-start"
            }`}
          >
            {msg.senderId !== user.id && (
              <img src="/profile.png" alt="Profile" className="w-8 h-8" />
            )}
            <div
              className={`p-3 rounded-lg flex flex-col max-w-xs ${
                msg.senderId === user.id ? "bg-blue-300" : "bg-gray-200"
              }`}
            >
              <span>{msg.text}</span>
              <p className="text-xs text-gray-500 text-right mt-1">
                {msg.createdAt?.seconds
                  ? new Date(msg.createdAt.seconds * 1000).toLocaleString(
                      "en-IN",
                      {
                        timeZone: "Asia/Kolkata",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "Loading..."}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chat;
