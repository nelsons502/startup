// postCard.jsx
import React, { useState } from "react";
import { likePost, downloadPost } from "./postsService";

export default function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = async () => {
    try {
      const updatedLikes = await likePost(post.id);
      setLikes(updatedLikes);
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };

  const handleDownload = () => {
    downloadPost(post.id);
    alert(`Downloading ${post.title}...`);
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