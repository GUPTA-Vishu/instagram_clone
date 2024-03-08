import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      navigate("/signup"); // Navigate to the signup page if user is not logged in
    }
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        <p>Raja Mathur</p>
      </div>
      <div className="card-container">
        <img src="https://images.unsplash.com/photo-1534970028765-38ce47ef7d8d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      </div>
      <div className="card-bottom">
        {/* font icon */}
        <span className="material-symbols-outlined">favorite</span>
        <p>1 Like</p>
        <p>hello this is awesome</p>
      </div>
      <div className="card-comment">
        {/* font icon */}
        <span className="material-symbols-outlined">sentiment_satisfied</span>
        <input type="text" placeholder="add a comment" />
        <button>post</button>
      </div>
    </div>
  );
};

export default Welcome;
