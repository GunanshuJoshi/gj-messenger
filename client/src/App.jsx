import React, { useContext, useEffect } from "react";
import ChatList from "./components/ChatList";
import ChatMessage from "./components/ChatMessage";
import Profile from "./components/Profile";
import UserContext from "./context/UserContext";
import { useNavigate } from "react-router";
const App = () => {
  const navigate = useNavigate();
  const { user, setUser, chats, setChats } = useContext(UserContext);
  console.log("🚀 ~ App ~ user:", user);
  useEffect(() => {
    console.log("useris", user);

    if (!user || Object.keys(user).length === 0) navigate("/signin");
  }, [user]);

  const handleLogout = () => {
    setUser({});
    setChats([]);
  };
  return (
    <div className="max-h-screen bg-linear-65 from-sky-500 to-indigo-500">
      <header className="flex items-center justify-between h-[10vh] px-10 bg-gray-800">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-16" />
          <span className="text-3xl font-bold text-white cursor-pointer leading-tight">
            GJ <br /> Chat
          </span>
        </div>

        <div className="flex space-x-3">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-2xl hover:bg-gray-600 transition"
            onClick={handleLogout}
          >
            Sign Out
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded-2xl hover:bg-gray-600 transition"
            onClick={() => navigate("/profile")}
          >
            Update Profile
          </button>
        </div>
      </header>

      <main className="grid grid-cols-[1fr_2fr] border-2 h-[90vh] ">
        <ChatList />
        <ChatMessage />
      </main>
    </div>
  );
};

export default App;
