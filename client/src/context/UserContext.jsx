import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../config/firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState(null);
  const [messagesData, setMessagesData] = useState(null);
  const [messageId, setMessageId] = useState(null);
  const [chatUser, setChatUser] = useState(null);

  const getUserData = async (id) => {
    if (!id) {
      setUser({});
      return;
    }
    try {
      const res = await getDoc(doc(db, "users", id));
      const userData = res.data();
      setUser(userData);
    } catch (error) {
      console.log("Error fetching user Data ", error);
    }
  };
  const getChatData = async (id) => {
    console.log("🚀 ~ getChatData ~ id:", id);
    if (!id) {
      setChats([]);
      return;
    }
    try {
      const res = await getDoc(doc(db, "chats", id));
      console.log("🚀 ~ getChatData ~ res:", res);
      const chatData = res.data();
      console.log("🚀 ~ getChatData ~ chatData:", chatData);
      if (!chatData.chatData) throw new Error("Chat Data is undefined!!!");
      setChats(chatData.chatData);
    } catch (error) {
      console.log("Error fetching chat Data ", error);
    }
  };

  const updateProfile = async (id, data) => {
    try {
      await updateDoc(doc(db, "users", id), data);
      await getUserData(id);
    } catch (error) {
      console.log("Error Updating the profile", error);
    }
  };

  const value = {
    user,
    getChatData,
    chats,
    getUserData,
    updateProfile,
    chatUser,
    setChatUser,
    setMessageId,
    messageId,
    messagesData,
    setMessagesData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
