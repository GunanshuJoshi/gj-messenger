import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const Chat = () => {
const { setMessagesData, messagesData, messageId } = useContext(UserContext);
useEffect(() => {
  console.log("🚀 ~ Chat ~ messagesData:", messagesData);
}, [messagesData]);

useEffect(() => {
  console.log("🚀 ~ Chat ~ messageId:", messageId);
  if (messageId) {
    const data = onSnapshot(doc(db, "messages", messageId), (res) => {
      setMessagesData(res.data().messages.reverse());
    });
    return () => data();
  }
}, [messageId]);

return (
  <div className="overflow-auto h-full w-full  space-y-4 flex flex-col p-4">
    <div className="secondUserMessage">
      <img src="/profile.png" alt="Profile" className="w-8 h-8" />
      <div className="bg-gray-200 p-3 rounded-lg flex flex-col">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
          exercitationem quibusdam aliquid soluta accusamus minima distinctio
          tempora dolores qui, dignissimos similique perspiciatis placeat
          atque illo culpa! Excepturi velit itaque fugit.
        </span>
        <p className="text-xs text-gray-500 text-right mt-1">2:30pm</p>
      </div>
    </div>

    <div className="currentUserMessage">
      <img src="/profile.png" alt="Profile" className="w-8 h-8" />
      <div className="bg-blue-300 p-3 rounded-lg flex flex-col">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
          exercitationem quibusdam aliquid soluta accusamus minima distinctio
          tempora dolores qui, dignissimos similique perspiciatis placeat
          atque illo culpa! Excepturi velit itaque fugit.
        </span>
        <p className="text-xs text-gray-500 text-right mt-1">2:32pm</p>
      </div>
    </div>
    <div className="secondUserMessage">
      <img src="/profile.png" alt="Profile" className="w-8 h-8" />
      <div className="bg-gray-200 p-3 rounded-lg flex flex-col">
        <img src="/bg1.jpg" alt="" />
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
          exercitationem quibusdam aliquid soluta accusamus minima distinctio
          tempora dolores qui, dignissimos similique perspiciatis placeat
          atque illo culpa! Excepturi velit itaque fugit.
        </span>

        <p className="text-xs text-gray-500 text-right mt-1">2:30pm</p>
      </div>
    </div>

    <div className="currentUserMessage">
      <img src="/profile.png" alt="Profile" className="w-8 h-8" />
      <div className="bg-blue-300 p-3 rounded-lg flex flex-col">
        <img src="/bg1.jpg" alt="" />
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
          exercitationem quibusdam aliquid soluta accusamus minima distinctio
          tempora dolores qui, dignissimos similique perspiciatis placeat
          atque illo culpa! Excepturi velit itaque fugit.
        </span>
        <p className="text-xs text-gray-500 text-right mt-1">2:32pm</p>
      </div>
    </div>
  </div>
);
};

export default Chat;
