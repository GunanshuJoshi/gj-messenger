import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Chat from "./components/Chat.jsx";
import Profile from "./components/Profile.jsx";
import SignIn from "./components/SignIn.jsx";
import SignUp from "./components/SignUp.jsx";
import { ToastContainer, toast } from "react-toastify";
import { UserProvider } from "./context/UserContext.jsx";
createRoot(document.getElementById("root")).render(
  <UserProvider>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </UserProvider>
);
