import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Welcome = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signup"); // Navigate to the signup page if the user is not logged in
      return; // Prevent further execution
    }

    // Fetching posts from the server
    fetch("http://localhost:5000/allposts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result); // Set the posts data
      })
      .catch((err) => console.log(err));
  }, [navigate]); // Adding navigate as a dependency

  const LikePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData=data.map((post)=>{
          if(post._id===result._id){
            return result;

          }
          else {
            return post;

          }
        })
        setData(newData)
        console.log(result);
      });
  };

  const unLikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData=data.map((post)=>{
          if(post._id===result._id){
            return result;

          }
          else {
            return post;

          }
        })
        setData(newData)
        console.log(result);
      });
  };

  return (
    <div>
      {data.map((post) => (
        <div key={post._id} className="card">
          <div className="card-header">
            {/* You might need to adjust these fields based on your post object structure */}
            <img
              src={
                post.postedBy.profilePic ||
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={post.postedBy.name}
            />
            <p>{post.postedBy.name}</p>
          </div>
          <div className="card-container">
            <img src={post.photo} alt="Post" />
          </div>
          <div className="card-bottom">
  {(() => {
    if (post.Likes.includes(JSON.parse(localStorage.getItem("user"))._id)) {
      return (
        <span
          className="material-symbols-outlined material-symbols-outlined-red"
          onClick={() => {
            unLikePost(post._id);
          }}
        >
          favorite
        </span>
      );
    } else {
      return (
        <span
          className="material-symbols-outlined"
          onClick={() => {
            LikePost(post._id);
          }}
        >
          favorite
        </span>
      );
    }
  })()}
<p>{post.Likes.length} Likes</p>
  <p>{post.body}</p>
</div>
          <div className="card-comment">
            <span className="material-symbols-outlined">
              sentiment_satisfied
            </span>
            <input type="text" placeholder="add a comment" />
            <button>post</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Welcome;
