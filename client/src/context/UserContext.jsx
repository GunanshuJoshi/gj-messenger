import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { db } from "../config/firebase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);

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
    if (!id) {
      setChats([]);
      return;
    }
    try {
      const res = await getDoc(doc(db, "chats", id));
      const chatData = res.data();
      setChats(chatData);
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
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
