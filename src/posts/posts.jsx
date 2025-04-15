import React, { useState } from "react";
import PostCard from "./postCard";
import { allDummyPosts } from "./postsService";
import "./posts.css";


export default function Posts() {
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

    const [visibleCount, setVisibleCount] = useState(1);
    const visiblePosts = allDummyPosts.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 2);
    };

    return (
        <main>
            <div className="center-container">
                <h2>Recent Posts</h2>

                {visiblePosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}

                {visibleCount < allDummyPosts.length && (
                    <button onClick={handleLoadMore}>Load More Posts</button>
                )}
            </div>
        </main>
    );
}