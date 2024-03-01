import React from 'react';
import "./createPost.css";

const CreatePost = () => {
  return (
    <div className='Create-Post'>
      <div className="post_header">
        <h4>Create Post</h4>
        <button id="post-btn">share</button>
      </div>
      <div className="main-div">
        <input type="file" accept='image/*' />
      </div>
      <div className="details">
        <div className="profile-card">
          <div className="profile-image">
            <img src="https://images.unsplash.com/photo-1534970028765-38ce47ef7d8d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <h4>vimal Prakash </h4>
        </div>
      </div>
      <textarea type="text" placeholder='Write a caption here...'></textarea>
    </div>
  );
}

export default CreatePost;
