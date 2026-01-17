import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Homepage = () => {
  const { setuserName } = useContext(UserContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleJoin = () => {
    if (!input.trim()) {
      alert("Please enter a username");
      return;
    }

    setuserName(input);
    localStorage.setItem("username", input);
    navigate("/chatroom");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500 px-4">
      <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-xl text-center">
        <h1 className="text-2xl font-bold mb-4">💬 Join Group Chat</h1>
        <p className="text-sm text-gray-600 mb-4">
          Enter a username to start chatting with everyone
        </p>

        <input
          type="text"
          placeholder="Enter your username"
          value={input}
          onChange={handleInput}
          className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleJoin}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          Join Chat
        </button>
      </div>
    </div>
  );
};

export default Homepage;
