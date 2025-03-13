import React, { useEffect, useState } from "react";
import Chat from "./Chat";
const ChatMessage = ({ secondUser }) => {
  useEffect(() => {
    console.log("🚀 ~ ChatMessage ~ secondUser:", secondUser);
  }, [secondUser]);

  const [active, setActive] = useState(true);
  return (
    <div className="bg-white flex flex-col justify-between items-center max-h-[90vh]">
      {Object.keys(secondUser).length > 0 ? (
        <>
          <header className="flex flex-row w-full items-center bg-[#194478]">
            <img
              src={secondUser?.dp || "/profile.png"}
              alt=""
              className="h-15"
            />
            <span className="text-xl text-white font-semibold uppercase">
              {secondUser.username}
            </span>
            <span
              className={`text-5xl ${
                active ? "text-green-400" : "text-red-700"
              }`}
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
        </>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          Start a new chat
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
