import { Route, Routes, Router, BrowserRouter } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import { UserProvider } from "./context/UserProvider.jsx";
import Chatroom from "./pages/Chatroom.jsx";
const App = () => {
  return (
    <UserProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chatroom" element={<Chatroom/>}/>
        </Routes>
     </UserProvider>
 
  );
};

export default App;
