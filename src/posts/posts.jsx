import React, { useState, useEffect } from "react";
import PostCard from "./postCard";
import { getPosts, createPost } from "./postsService";
import "./posts.css";


export default function Posts() {
    const [visibleCount, setVisibleCount] = useState(1);
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        title: "",
        content: "",
        type: "python",
        code: "",
    });

    const handleCreatePost = async () => {
        try {
            const created = await createPost(newPost);
            setPosts([created, ...posts]);
            setNewPost({ title: "", content: "", type: "python", code: "" });
        } catch (err) {
            console.error("Failed to create post", err);
        }
    };

    useEffect(() => {
        async function loadPosts() {
            try {
                const postsData = await getPosts();
                console.log("Posts data:", postsData);
                setPosts(postsData);
            } catch (err) {
                console.error("Failed to fetch posts, posts.loadPosts", err);
            }
        }
        loadPosts();
    }, []);

    const visiblePosts = posts.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 2);
    };

    return (
        <main>
            <div className="center-container">
                <div className="new-post-form">
                    <h3>Create a New Post</h3>
                    <input
                        type="text"
                        placeholder="Title"
                        className="title-input"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    />
                    <textarea
                        placeholder="Content"
                        className="content-input"
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    />
                    <select
                        value={newPost.type}
                        className="type-select"
                        onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
                    >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="c++">C++</option>
                    </select>
                    <textarea
                        placeholder="Code"
                        className="code-input"
                        value={newPost.code}
                        onChange={(e) => setNewPost({ ...newPost, code: e.target.value })}
                    />
                    <button onClick={handleCreatePost}>Post</button>
                </div>

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