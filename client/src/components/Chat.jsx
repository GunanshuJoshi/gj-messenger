import React from "react";

const Chat = () => {
  return (
    <div className="overflow-auto h-full w-full space-y-4 flex flex-col p-4">
      <div className="flex w-[70%] mx-5 items-end space-x-3">
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

      <div className="flex w-[70%] ml-auto mx-5 items-end space-x-3 flex-row-reverse">
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
      <div className="flex w-[70%] mx-5 items-end space-x-3">
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

      <div className="flex w-[70%] ml-auto mx-5 items-end space-x-3 flex-row-reverse">
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
