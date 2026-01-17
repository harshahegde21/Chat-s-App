
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import { UserContext } from "../context/UserProvider";

const Chatroom = () => {
  const { username, setuserName } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [leftUser, setLeftUser] = useState("");
  const [joinedUser,setjoinedUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const uname = localStorage.getItem("username");
    if (!uname) {
      navigate("/");
      return;
    }

    setuserName(uname);

    socket.emit("new-user", {
      username: uname,
      time: new Date().toLocaleString(),
    });

    socket.on("sent-message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("left-users", (user) => {
      setLeftUser(`${user.username} left the chat`);
      setTimeout(() => setLeftUser(""), 3000);
    });

    socket.on("new-user-joined",(user)=>{
      setjoinedUser(`${user.username} Joined the chat`)
      setTimeout(()=>{setjoinedUser("")},3000);
    })

    return () => {
      socket.off("sent-message");
      socket.off("left-users");
    };
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    socket.emit("send-message", {
      sender: username,
      message,
      time: new Date().toLocaleString(),
    });

    setMessage("");
  };

  const handleExit = () => {
    socket.emit("exit-user", {
      username,
      time: new Date().toLocaleString(),
    });
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100 p-2">
      <div className="flex flex-col w-full max-w-md md:max-w-xl h-[90vh] bg-white rounded-lg shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 bg-green-500 text-white rounded-t-lg">
          <h1 className="text-lg font-semibold">Group Chat</h1>
          <button
            onClick={handleExit}
            className="bg-red-500 px-3 py-1 rounded-md text-sm"
          >
            Exit
          </button>
        </div>

        {/* LEFT USER INFO */}
        {leftUser && (
          <div className="text-center text-sm bg-yellow-200 py-1">
            {leftUser}
            
          </div>
        )}

        {/* Joined user Info USER INFO */}
        {joinedUser && (
          <div className="text-center text-sm bg-yellow-200 py-1">
            {joinedUser}
          </div>
        )}

        {/* CHAT MESSAGES */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[75%] p-2 rounded-lg text-sm ${
                msg.sender === username
                  ? "ml-auto bg-green-300 text-right"
                  : "mr-auto bg-gray-200"
              }`}
            >
              <p className="font-semibold">{msg.sender}</p>
              <p>{msg.message}</p>
              <p className="text-xs text-gray-600">
                {msg.time.split(",")[1]}
              </p>
            </div>
          ))}
        </div>

        {/* INPUT AREA */}
        <div className="flex gap-2 p-3 border-t">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-md px-3 py-2 text-sm outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;

