import React, { useState } from "react";
import Chat from "./Chat";
const ChatMessage = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="bg-white flex flex-col justify-between items-center max-h-[90vh]">
      <header className="flex flex-row w-full items-center">
        <img src="/profile.png" alt="" className="h-15" />
        <span className="text-2xl font-semibold uppercase">name</span>
        <span
          className={`text-5xl ${active ? "text-green-400" : "text-red-700"}`}
        >
          •
        </span>
      </header>
      <div className="h-[70vh]">
        <Chat />
      </div>
      <div className="flex justify-between w-[90%] mb-3 bg-gray-200 rounded-4xl p-2 shadow-md">
        <img
          src="/link.png"
          alt="Link"
          className="h-10 w-12 cursor-pointer hover:opacity-80 transition-opacity"
        />

        <input
          type="text"
          placeholder="Start Typing..."
          className="w-full bg-transparent px-5 text-gray-800 placeholder-gray-500 outline-none"
        />

        <img
          src="/dm.png"
          alt="DM"
          className="h-10 w-12 cursor-pointer hover:opacity-80 transition-opacity"
        />
      </div>
    </div>
  );
};

export default ChatMessage;
