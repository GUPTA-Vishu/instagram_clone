import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { createContext, useEffect } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Home from "./components/Home";
import CreatePost from "./components/createPost";
import { LoginContext } from "./context/LoginContext";

function App() {
  const [userLogin, setUserLogin] = useState(false);
  return (
    <div className="App">
      <LoginContext.Provider value={{setUserLogin}}>
        <BrowserRouter>
          <Navbar login={userLogin} />
          <br />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/createPost" element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
