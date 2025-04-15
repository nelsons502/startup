// reusable component for rendering each post

// postCard.jsx
import React, { useState, useEffect } from "react";
import { likePost, hasUserLiked, downloadDummyCodeFile } from "./postsService";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (hasUserLiked(post.id)) {
      setLiked(true);
      setLikes(1); // simulate initial liked valueß
    }
  }, [post.id]);

  const handleLike = () => {
    if (!liked && likePost(post.id)) {
      setLikes(likes + 1);
      setLiked(true);
    }
  };

  const handleDownload = () => {
    downloadDummyCodeFile();
  };

  return (
    <div className="post-card" key={post.id}>
      <h4>{post.title}</h4>
      <p>{post.content}</p>
      <button className="like-button" onClick={handleLike}>Like</button>
      <span>Likes: {likes}</span>
      <button className="download-button" onClick={handleDownload}>Download</button>
      <p className="timestamp">Posted on: {post.timestamp}</p>
    </div>
  );
}