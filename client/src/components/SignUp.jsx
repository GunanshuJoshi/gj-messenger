import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { signup } from "../config/firebase";
import UserContext from "../context/UserContext";

const SignUp = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🚀 Signing up with:", form);
      const userData = await signup(form.username, form.email, form.password);
      console.log("🚀 ~ handleSubmit ~ userData:", userData);
      setUser(user);
      setForm({ username: "", email: "", password: "" });
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[url(/bg2.jpg)] font-lato w-full h-screen flex flex-col justify-center items-center text-stone-300 p-5">
      <div className="space-y-4 rounded-4xl flex flex-col justify-center my-5 bg-black/30 w-[90%] md:w-[60%] lg:w-[40%]">
        <span className="text-3xl font-bold text-center my-5">Sign Up</span>
        <form
          className="flex flex-col space-y-5 items-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="username" className="text-lg">
            User Name
          </label>
          <input
            placeholder="Enter your username..."
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-md max-w-[90%] bg-black/50 rounded-3xl h-8 pl-5"
            required
          />
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            placeholder="Enter your email..."
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-md max-w-[90%] bg-black/50 rounded-3xl h-8 pl-5"
            required
          />
          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <input
            placeholder="Enter your password..."
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-md max-w-[90%] bg-black/50 rounded-3xl h-8 pl-5"
          />
          <span className="max-w-[80%] text-center">
            Already have an account?
            <a
              onClick={(e) => {
                e.preventDefault();
                navigate("/signin");
              }}
              className="hover:underline hover:text-blue-600 hover:font-bold px-2"
            >
              Sign In
            </a>
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

export default SignUp;
