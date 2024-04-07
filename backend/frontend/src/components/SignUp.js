import React, { useState } from "react";
import logo from "./image/pic.png";
import "./SignUp.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  const handleClick = (e) => {
    e.preventDefault();
    postData();
  };

  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      return;
    }
    if (!passRegex.test(password)) {
      notifyA(
        "Input Password and Submit [6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter]"
      );
      return;
    }
    fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullName,
        userName: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/signin");
        }
        console.log(data);
      });
  };

  return (
    <div className="box">
      <div className="box2">
        <img className="body_image" src={logo} alt="" />
        <p>Sign up to see photos and videos from your friends.</p>
        <form className="form">
          <input
            className="innerbox"
            type="email"
            placeholder="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />

          <input
            className="innerbox"
            type="text"
            placeholder="name"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <br />

          <input
            className="innerbox"
            type="text"
            placeholder="username"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />

          <input
            className="innerbox"
            type="password"
            placeholder="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />

          <br />

          <input
            id="button"
            type="submit"
            value="Sign Up"
            onClick={handleClick}
          />
          <ToastContainer />
        </form>
      </div>
      <br />

      <div className="down_block">
        <p>
          Have an account? <span>Log in.</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
