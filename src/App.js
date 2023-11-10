import { BrowserRouter, Route, Routes } from "react-router-dom";
import { chatContext } from "./context";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";


function App() {
  const [userId, setUserId] = useState("")
  return (
    <BrowserRouter>
      <chatContext.Provider value={{ userId, setUserId }}>
        <Routes>
          <Route path="/chat-app-with-firebase" element={<Home />} />
          <Route path="/chat-app-with-firebase/login" element={<Login />} />
          <Route path="/chat-app-with-firebase/create" element={<CreateAccount />} />
        </Routes>

      </chatContext.Provider>
    </BrowserRouter>
  );
}

export default App;
