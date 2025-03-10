import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
const ChatList = () => {
  const data = [
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage: "How are you? I am good?",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nulla veritatis praesentium perferendis delectus at maxime dolorem tempore, odit doloremque voluptatem pariatur voluptate temporibus libero numquam saepe eum vel ea.",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage: "How are you? I am good?",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nulla veritatis praesentium perferendis delectus at maxime dolorem tempore, odit doloremque voluptatem pariatur voluptate temporibus libero numquam saepe eum vel ea.",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage: "How are you? I am good?",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nulla veritatis praesentium perferendis delectus at maxime dolorem tempore, odit doloremque voluptatem pariatur voluptate temporibus libero numquam saepe eum vel ea.",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage: "How are you? I am good?",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nulla veritatis praesentium perferendis delectus at maxime dolorem tempore, odit doloremque voluptatem pariatur voluptate temporibus libero numquam saepe eum vel ea.",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage: "How are you? I am good?",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nulla veritatis praesentium perferendis delectus at maxime dolorem tempore, odit doloremque voluptatem pariatur voluptate temporibus libero numquam saepe eum vel ea.",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage: "How are you? I am good?",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nulla veritatis praesentium perferendis delectus at maxime dolorem tempore, odit doloremque voluptatem pariatur voluptate temporibus libero numquam saepe eum vel ea.",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage: "How are you? I am good?",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nulla veritatis praesentium perferendis delectus at maxime dolorem tempore, odit doloremque voluptatem pariatur voluptate temporibus libero numquam saepe eum vel ea.",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage: "How are you? I am good?",
    },
    {
      profile: "/profile.png",
      name: "Gunanshu",
      lastMessage:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis nulla veritatis praesentium perferendis delectus at maxime dolorem tempore, odit doloremque voluptatem pariatur voluptate temporibus libero numquam saepe eum vel ea.",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 3000);

  useEffect(() => {
    console.log(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <div className="h-full flex flex-col items-center w-full bg-black/20  ">
      <div className="w-[90%] mt-2 h-10 rounded-4xl bg-black/40 flex gap-2">
        <img
          src="/search.png"
          alt="search"
          className="h-10 p-2 cursor-pointer invert-100"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          className="w-full p-1 focus:outline-none focus:ring-0 placeholder:text-amber-50 text-white"
        />
        {searchTerm !== "" && (
          <img
            src="/close.png"
            className="h-10 p-2 cursor-pointer"
            onClick={() => setSearchTerm("")}
          />
        )}
      </div>
      <div className="h-[80vh] overflow-auto  w-[90%] flex flex-col gap-3 mt-5">
        {data.map((i, index) => (
          <div className="flex flex-row w-full min-w-0 hover:bg-[#205496] hover:text-white">
            <img
              src={i?.profile || "/profile.png"}
              alt="Profile pic"
              className="h-12"
            />
            <div className="flex flex-col w-full min-w-0">
              <span className="text-lg font-bold">{i.name}</span>
              <span className="max-w-[300px] truncate overflow-hidden whitespace-nowrap block">
                {i.lastMessage}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
