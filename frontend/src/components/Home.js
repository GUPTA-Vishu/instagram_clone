import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Welcome = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);
  const [item, setItem] = useState([]);

  const notifyB = (msg) => toast.success(msg);

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
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
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
        const newData = data.map((post) => {
          if (post._id === result._id) {
            return result;
          } else {
            return post;
          }
        });
        setData(newData);
        console.log(result);
      });
  };

  const toggleComment = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setItem(posts);
    }
  };

  const makeComment = (text, id) => {
    fetch("http://localhost:5000/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment("");
        notifyB("Comment posted");
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
              if (
                post.Likes.includes(
                  JSON.parse(localStorage.getItem("user"))._id
                )
              ) {
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
            <p
                style={{ fontWeight: "bold", cursor: "pointer" }}
                onClick={() => {
                  toggleComment(post);
                }}
              >
                View all comments
              </p>
          </div>
          <div className="card-comment">
            <span className="material-symbols-outlined">
              sentiment_satisfied
            </span>
            <input
              type="text"
              placeholder="add a comment"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button onClick={() => makeComment(comment, post._id)}>post</button>
          </div>
        </div>
      ))}

      {/* show Comment */}
      {show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>
            <div className="details">
              {/* card header */}
              <div
                className="card-header"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                <div className="card-pic">
                  <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                  />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>

              {/* commentSection */}
              <div
                className="comment-section"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                {item.comments?.map((comment) => {
    return (
      <p className="comm" key={comment._id}>
        <span
          className="commenter"
          style={{ fontWeight: "bolder" }}
        >
          {comment.postedBy.name}{" "}
        </span>
        <span className="commentText">{comment.comment}</span>
      </p>
    );
  })}
</div>

{/* card content */}
<div className="card-content">
  <p>{item.likes?.length} Likes</p>
  <p>{item.body}</p>
</div>

              {/* add Comment */}
              <div className="add-comment">
                <span className="material-symbols-outlined">mood</span>
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <button
                  className="comment"
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div
            className="close-comment"
            onClick={() => {
              toggleComment();
            }}
          >
            <span className="material-symbols-outlined material-symbols-outlined-comment">
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
