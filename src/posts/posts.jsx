import React, { useState, useEffect } from "react";
import PostCard from "./postCard";
import { getPosts } from "./postsService";
import "./posts.css";


export default function Posts() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authChecked, setAuthChecked] = useState(false);
    const [visibleCount, setVisibleCount] = useState(1);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function checkLogin() {
            try {
                const res = await fetch("/api/user/me", { credentials: "include" });
                setIsLoggedIn(res.ok);
            } catch {
                setIsLoggedIn(false);
            } finally {
                setAuthChecked(true);
            }
        }
        checkLogin();
    }, []);

    useEffect(() => {
        if (!isLoggedIn) return;
        async function loadPosts() {
            try {
                const postsData = await getPosts();
                setPosts(postsData);
            } catch (err) {
                console.error("Failed to fetch posts", err);
            }
        }
        loadPosts();
    }, [isLoggedIn]);

    if (!authChecked) {
        return (
            <main>
                <div className="center-container">
                    <p>Checking login status...</p>
                </div>
            </main>
        );
    }

    if (!isLoggedIn) {
        return (
            <main>
                <div className="center-container">
                    <p>You must log in to use/view this feature.</p>
                </div>
            </main>
        );
    }

    const visiblePosts = posts.slice(0, visibleCount);

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

                {visibleCount < posts.length && (
                    <button onClick={handleLoadMore}>Load More Posts</button>
                )}
            </div>
        </main>
    );
}