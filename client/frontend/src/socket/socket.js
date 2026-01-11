import {io} from "socket.io-client"
const socket = io("http://localhost:9878");
export default socket;