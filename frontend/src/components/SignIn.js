import React, { useState } from "react";
import "./SignIn.css";
import pic from "./image/pic.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleSignIn = (e) => {
    e.preventDefault();
    postData();
  };
  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      return;
    }

    fetch("http://localhost:5000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message)
          console.log(data.token);
          localStorage.setItem("jwt", data.token);
          navigate("/");
        }
        console.log(data.token);
      });
  };

  return (
    <div className="box">
      <img className="image_pic" src={pic} alt="" />
      <h2 className="tag">Sign in</h2>
      <form className="form" onSubmit={handleSignIn}>
        <div>
          <input
            className="inner"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            className="inner"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button  onClick={handleSignIn} id="button" type="submit">
          Sign in 
        </button>
		<ToastContainer />
      </form>
      <br />
      <div className="down_block1">
        <p>
          Don't have an account? <span>Sign up</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
