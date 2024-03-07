import React, { useState, useEffect } from "react";
import "./createPost.css";

import Preview from "./image/Preview.png"; // adjust the file extension based on the actual image file type

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [url, setUrl] = useState(null);
  const [file, setFile] = useState(null); // New state to hold the file

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          caption,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCaption("");
          setImage(null);
          setUrl("");
        })
        .catch((err) => console.log(err));
    }
  }, [url, caption]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file); // Save the file for uploading
    }
  };

  const handleBrowseClick = () => {
    // Simulate click on the hidden file input
    document.getElementById("file-input").click();
  };

  // Posting image to Cloudinary and obtaining its URL
  const createPostDetails = () => {
    if (!file) return; // Ensure there's a file to upload

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "insta_clone");
    data.append("cloud_name", "dr7gktuli");

    fetch("https://api.cloudinary.com/v1_1/dr7gktuli/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setUrl(data.url))
      .catch((err) => console.log(err));
  };

  return (
    <div className="Create-Post">
      <div className="post_header">
        <h4 style={{ margin: "3px auto" }}>Create Post</h4>
        <button id="post-btn" onClick={createPostDetails}>
          Share
        </button>
      </div>
      <div className="main-div">
        {image ? (
          <img
            src={image}
            alt="Preview"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        ) : (
          <img
            src={Preview}
            alt="Placeholder"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        )}
        {/* Hidden file input */}
        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        {/* Button to trigger file input */}
        <button className="browse-button" onClick={handleBrowseClick}>
          Browse
        </button>
      </div>
      <div className="details">
        <div className="profile-card">
          <div className="profile-image">
            <img
              className="image"
              src="https://images.unsplash.com/photo-1534970028765-38ce47ef7d8d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <h4>vimal Prakash </h4>
        </div>
      </div>
      <textarea
        type="text"
        value={caption}
        onChange={(e) => {
          setCaption(e.target.value);
        }}
        placeholder="Write a caption here..."
      ></textarea>
    </div>
  );
};

export default CreatePost;
