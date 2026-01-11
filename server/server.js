import express from "express"
import http from "http"
import {Server} from "socket.io"
const app = express();
const server = http.createServer(app);

const io = new Server(server,{cors:{
    origin:"http://localhost:5173"
}})

const PORT = 9878;
let messages = {}
io.on("connection",(socket)=>{
    console.log(socket.id+" got connected");
    // let already in users to know the new joined user
    socket.on("new-user",(user)=>{
        console.log(user.username+" Joined the chat");
       socket.broadcast.emit("new-user-joined",user);
    })

    // exit user
    socket.on("exit-user",(user)=>{
        socket.disconnect();
        console.log(user.username+ " left the chat at"+user.time);
        socket.broadcast.emit("left-users",user);
    })
    // send the message to all
    socket.on("send-message",(msg)=>{
        console.log(msg);
        console.log(msg.message);
        console.log(msg.sender);
       io.emit("sent-message",msg);
    })
})

server.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`);
})