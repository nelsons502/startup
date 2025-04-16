// future backend interaction (fetch, like, download, etc)
import React from "react";

export async function getPosts() {
    const res = await fetch("/api/posts", { credentials: "include" });
    if (!res.ok) {
        throw new Error("Failed to fetch posts");
    }
    return await res.json();
}

export async function likePost(postId) {
    const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Failed to like post");
    }

    const updatedPost = await res.json();
    return updatedPost.likes;
}

export async function downloadPost(postId) {
    const res = await fetch(`/api/posts/${postId}`, {
        credentials: "include"
    });
    if (!res.ok) return;

    const post = await res.json();

    const fileExtensions = {
        "python": "py",
        "javascript": "js",
        "java": "java",
        "c++": "cpp"
    };

    const extension = fileExtensions[post.type.toLowerCase()] || "txt";
    const fileName = post.title.toLowerCase().replace(/\s+/g, "_") + "." + extension;

    const blob = new Blob([post.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}