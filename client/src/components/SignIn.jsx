import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { auth, signin } from "../config/firebase";
import UserContext from "../context/UserContext";

const SignIn = () => {
  const { user, setUser, chats, setChats } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.target);
    const email = data.get("email");
    const password = data.get("password");
    const { userData, chatData } = await signin(email, password);
    console.log("🚀 ~ handleSubmit ~ userData:", userData);
    console.log("🚀 ~ handleSubmit ~ chatData:", chatData);
    setUser(userData);
    setChats(chatData);
    setLoading(false);
  };
  useEffect(() => {
    console.log("Updated user:", user);
    if (user && Object.keys(user).length > 0) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="bg-[url(/bg2.jpg)] font-lato w-full h-screen flex flex-col justify-center items-center text-stone-300 p-5">
      <div className="space-y-4 rounded-4xl flex flex-col justify-center my-5 bg-black/30 w-[90%] md:w-[60%] lg:w-[40%]">
        <span className="text-3xl font-bold text-center my-5">Sign In</span>
        <form
          className="flex flex-col space-y-5 items-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            placeholder="Enter your email..."
            type="email"
            name="email"
            className="w-md max-w-[90%] bg-black/50 rounded-3xl h-8 pl-5"
          />
          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <input
            placeholder="Enter your password..."
            type="password"
            name="password"
            className="w-md max-w-[90%] bg-black/50 rounded-3xl h-8 pl-5"
          />
          <span className="max-w-[80%] text-center">
            Doesn't have an account yet?
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate("/signup");
              }}
              className="hover:underline hover:text-blue-600 hover:font-bold px-2"
            >
              Sign Up
            </a>
          </span>
          <span className=" max-w-[80%] text-center hover:underline hover:text-blue-600 hover:font-bold px-2">
            Forget Password?
          </span>
          <button
            type="submit"
            className="bg-green-700 mb-5 p-3 font-bold text-lg w-[80%] md:w-[40%] rounded-lg hover:ring-2 hover:ring-gray-400 hover:bg-[#0e202e] disabled:bg-[#0e202e]"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
