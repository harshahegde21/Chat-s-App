# Chats App

**Chats App** is a **real-time group chat application** built using **React.js**, **Tailwind CSS**, **Node.js**, and **Express.js**. It allows multiple users to join a single chat room and communicate instantly without the need for authentication. This app is perfect for demo purposes, small projects, or learning WebSockets and real-time communication.

---

## 🔹 Features

- **Real-time Messaging**: Messages are instantly delivered to all users in the chat room.
- **Random Group Chat**: Multiple users can join the same room and chat together.
- **No Authentication**: Simple and easy to use, no login required.
- **Temporary User Notifications**: Shows when a user joins or leaves the chat for 3 seconds.
- **Responsive UI**: Built with **Tailwind CSS**, works on both desktop and mobile.
- **Simple Architecture**: React frontend + Node.js + Express backend with **Socket.io** for real-time communication.

---

## 🛠️ Technologies Used

- **Frontend**: React.js, Tailwind CSS  
- **Backend**: Node.js, Express.js  
- **Real-time Communication**: Socket.io  
- **Others**: Local storage (to store temporary username)

---

## ⚡ How It Works

1. Users open the app and enter a **username**.
2. All users are connected to a single **group chat room**.
3. When a user sends a message, it is instantly broadcasted to all connected users using **Socket.io**.
4. Notifications appear for users **joining** or **leaving** the chat, and vanish after 3 seconds.
5. All chat messages exist in server memory (no database), so they **disappear when the server restarts**.

---

## 🚀 Installation

### 1. Clone the repository
```bash
git clone https://github.com/harshahegde21/Chat-s-App.git
cd Chat-s-App