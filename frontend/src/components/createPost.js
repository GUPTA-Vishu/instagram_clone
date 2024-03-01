import React, { useState } from 'react';
import "./createPost.css";

import Preview from "./image/Preview.png"; // adjust the file extension based on the actual image file type

const CreatePost = () => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      // Display placeholder image when no file is chosen
      setImagePreview("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.iconpacks.net%2Ffree-icon%2Ffile-1453.html&psig=AOvVaw1gMN7ytwCzCoWSBJc_7_Ts&ust=1709379445351000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIjRrOf80oQDFQAAAAAdAAAAABAJ");
    }
  };

  const handleBrowseClick = () => {
    // Simulate click on the hidden file input
    document.getElementById('file-input').click();
  };

  return (
    <div className='Create-Post'>
      <div className="post_header">
        <h4 style={{ margin: "3px auto" }}>Create Post</h4>
        <button id="post-btn">share</button>
      </div>
      <div className="main-div">
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        ) : (
          <img src={Preview} alt="Placeholder" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        )}
         {/* Hidden file input */}
         <input type="file" id="file-input" accept='image/*' onChange={handleFileChange} style={{ display: 'none' }} />
        {/* Button to trigger file input */}
        <button className='browse-button' onClick={handleBrowseClick}>Browse</button>
      </div>
      <div className="details">
        <div className="profile-card">
          <div className="profile-image">
            <img className='image' src="https://images.unsplash.com/photo-1534970028765-38ce47ef7d8d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <h4>vimal Prakash </h4>
        </div>
      </div>
      <textarea type="text" placeholder='Write a caption here...'></textarea>
    </div>
  );
}

export default CreatePost;
