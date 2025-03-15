import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  startAt,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { db } from "../config/firebase";
import UserContext from "../context/UserContext";
const ChatList = () => {
  const { user, chats, getChatData, setChatUser, setMessageId } =
    useContext(UserContext);
  const [data, setData] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 3000);
  const fetchAllUsers = async () => {
    try {
      const res = await getDocs(collection(db, "users"));
      console.log("🚀 ~ fetchAllUsers ~ res:", res);
      let allUserData = res.docs.map((doc) => doc.data());
      allUserData = allUserData.map((i) => {
        const chatWithUser = chats.find((chat) => chat.secondUserId === i.id);

        if (chatWithUser) {
          i.lastMessage = chatWithUser.lastMessage;
        }

        return i;
      });
      console.log("🚀 ~ fetchAllUsers ~ allUserData:", allUserData);
      setData(allUserData);

      console.log(chats);
    } catch (error) {
      console.log("Error while fetching users: ", error);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    fetchSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchSearch = async (input) => {
    if (!input) return;
    console.log("🚀 ~ fetchSearch ~ input:", input);
    const userRef = collection(db, "users");
    const q = query(
      userRef,
      orderBy("username"),
      startAt(debouncedSearchTerm.toLowerCase()),
      endAt(debouncedSearchTerm.toLowerCase() + "\uf8ff")
    );

    const res = await getDocs(q);
    console.log("🚀 ~ useEffect ~ res:", res);
    const matchedUsers = res.docs.map((doc) => doc.data());
    console.log("🚀 ~ fetchSearch ~ matchedUsers:", matchedUsers);
    setData(matchedUsers);
  };
  const addNewChat = async (secondUser) => {
    setChatUser(secondUser);
    const chatWithSecondUser = chats.filter((i) => {
      console.log(i.secondUserId, " ", user.id);
      return i?.secondUserId === secondUser.id;
    });
    console.log("🚀 ~ addNewChat ~ chatWithSecondUser:", chatWithSecondUser);

    if (chatWithSecondUser.length > 0) {
      console.log("✅ Chat already exists:", chatWithSecondUser[0]);
      setMessageId(chatWithSecondUser[0].messageId);
      return;
    }
    try {
      const messageRef = await addDoc(collection(db, "messages"), {
        createdAt: serverTimestamp(),
        messages: [],
      });

      console.log("🚀 ~ addNewChat ~ messageRef:", messageRef);
      const chatRef = collection(db, "chats");
      console.log("🚀 ~ addNewChat ~ chatRef:", chatRef);
      await updateDoc(doc(chatRef, secondUser.id), {
        chatData: arrayUnion({
          messageId: messageRef.id,
          lastMessage: "",
          secondUserId: user.id,
          updatedAt: Date.now(),
          messageSeen: false,
        }),
      });
      await updateDoc(doc(chatRef, user.id), {
        chatData: arrayUnion({
          messageId: messageRef.id,
          lastMessage: "",
          secondUserId: secondUser.id,
          updatedAt: Date.now(),
          messageSeen: false,
        }),
      });
      await getChatData(user.id);
      console.log("done");
    } catch (error) {
      console.log("🚀 ~ addNewChat ~ error:", error);
    }
  };

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
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          placeholder="Search"
          className="w-full p-1 focus:outline-none text-leftfocus:ring-0 placeholder:text-amber-50 text-white"
        />
        {searchTerm !== "" && (
          <img
            src="/close.png"
            className="h-10 p-2 cursor-pointer"
            onClick={() => {
              setSearchTerm("");
              fetchAllUsers();
            }}
          />
        )}
      </div>
      <div className="h-[80vh] overflow-auto  w-[90%] flex flex-col gap-3 mt-5">
        {data
          .filter((i) => i.id !== user.id)
          .map((i) => (
            <div
              key={i.id}
              className="flex flex-row w-full rounded-3xl hover:bg-[#205496] hover:text-white"
              onClick={() => addNewChat(i)}
            >
              <img
                src={i?.dp || "/profile.png"}
                alt="Profile pic"
                className="h-12 w-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex flex-col w-full ml-2">
                <span className="text-lg font-bold">{i.username}</span>
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
