import React from "react";
import PostCard from "./postCard";

const posts = [
  {
    id: 1,
    title: "Post Title 1",
    content: "Content of the post goes here...",
    timestamp: "2025-02-12 10:30 AM",
  },
  // More dummy posts...
];

export default function Posts() {
    // Auth Guard
    const username = localStorage.getItem("username");
    if (!username) {
        return (
            <main>
            <div className="center-container">
                <p>You must log in to use/view this feature.</p>
            </div>
            </main>
        );
    }
    // Fetch posts from API or use dummy data
    return (
        <main>
            <div className="center-container">
            <h2>Recent Posts</h2>

            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}

            <button>Load More Posts</button>
            </div>
        </main>
    );
}