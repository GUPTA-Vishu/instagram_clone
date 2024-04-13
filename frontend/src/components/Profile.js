import React, { useEffect, useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [pics, setPics] = useState([]);
  
  useEffect(() => {
    fetch("/myposts", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then((result) => {
      setPics(result);
      console.log(result);
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
    });
  }, []);

  return (
    <div className="profile-page">
      <div className="upper">
        <div className="profile-pic">
          <img
            className="profile"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="profile_content">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="items">
            <p>{pics.length} posts</p>
            <p>200 followers</p>
            <p>40 following</p>
          </div>
        </div>
      </div>
      {pics.length > 0 && (
        <div className="gallery">
          {pics.map((pic) => (
            <img key={pic._id} src={pic.photo} alt="" className="item" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
