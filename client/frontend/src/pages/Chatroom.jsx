// import React from "react";
// import { useEffect } from "react";
// import socket from "../socket/socket";
// import { UserContext } from "../context/UserProvider";
// import { useContext } from "react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// const Chatroom = () => {
//   const { username,setuserName } = useContext(UserContext);
//   const [messages, setMessages] = useState([]);
//   const [joinedUsers, setjoinedUsers] = useState([]);
//   const [leftUser, setleftUser] = useState("");
//   const [showleftUser, setshowleftUser] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();
//   useEffect(() => {
//     const uname = localStorage.getItem("username");
//     console.log(uname);
    
//     // setuserName(uname);
//     socket.emit("new-user", {
//       username: uname,
//       time: Date.toLocaleString(),
//     });

//    socket.on("sent-message",msg=>{
//     console.log(msg);
    
//     setMessages(prev=>[...prev,msg]);
//     console.log(messages);
    
//    })
//     return () => {
//       socket.off("sent-message");
//     };
//   }, []);

//   const handleSend = (e) => {
//     socket.emit("send-message", {
//       message,
//      time: new Date().toLocaleString(),
//       sender:username
//     });
//     setMessage("");
//   };

//   const handleExit = async() => {
//     socket.emit("exit-user", {
//       username: username,
//       time:new Date().toLocaleString(),
//     });

//       socket.on("left-users", (user) => {
//         alert("user left");
//         setleftUser(user);
//       });
//       setTimeout(() => {
//           setshowleftUser(!showleftUser);
//         }, 3000);
//     navigate("/");
//   };
//   return (
//     <div>
//     <div className="bg-green-200 h-[90vh]  md:w-[50vh] md:ml-150 md:h-[90vh] overflow-scroll" >
//       <div className="grid-cols-2">
//         <h1 className="text-2xl">Welcome to Group Chat</h1>
//         <button className="bg-red-500" onClick={handleExit}>
//           Exit
//         </button>
//       </div>
//       {showleftUser && <div className="h-30 bg-amber-800">{leftUser+ "left the chat"}</div>}
//       <div className="">
//         {messages.map((msg,index) => (
//           <div key={index} className="bg-amber-300 m-2 w-50">
//             <p key={index}>{msg.sender}</p>
//             <p className="text-xl" key={index}>{msg.message}</p>
//             <p className="ml-20">{msg.time.split(',')[1]}</p>
//           </div>
          
//         ))}
//       </div>
//        <div className="input mt-190 ml-5 md:mt-150">
//         <input
//           className="px-20 border-1 w-70"
//           type="text"
//           placeholder="type here"
//           value={message}
//           onChange={(e) =>{ setMessage(e.target.value);
//           }}
//         />
//         <button onClick={handleSend}>send</button>
//       </div>
//     </div>
//     </div>
    
//   );
// };

// export default Chatroom;


import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import { UserContext } from "../context/UserProvider";

const Chatroom = () => {
  const { username, setuserName } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [leftUser, setLeftUser] = useState("");
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
      setLeftUser(`${user} left the chat`);
      setTimeout(() => setLeftUser(""), 3000);
    });

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

