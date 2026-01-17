import {io} from "socket.io-client"
const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:9878";

const socket = io(BACKEND_URL,{
    transports:["websocket"],
    autoConnect:true
});
export default socket;