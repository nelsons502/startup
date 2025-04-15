// future backend interaction (fetch, like, download, etc)
import React from "react";

export const allDummyPosts = [
  {
    id: 1,
    title: "Post Title 1",
    content: "Content of the post goes here...",
    timestamp: "2025-02-12 10:30 AM",
    likes: 0,
    code: "# This is dummy code\nprint('Hello, World!')",
    type: "python",
  },
  {
    id: 2,
    title: "Post Title 2",
    content: "Another example post content here...",
    timestamp: "2025-02-13 11:00 AM",
    likes: 0,
    code: "// This is dummy code\nconsole.log('Hello, World!');",
    type: "javascript",
  },
  {
    id: 3,
    title: "Post Title 3",
    content: "Third post sample with simple content.",
    timestamp: "2025-02-14 09:15 AM",
    likes: 0,
    code: '// This is dummy code\nclass Main {\n\tpublic static void main() {\nSystem.out.println("Hello, World!");\n}\n}',
    type: "java",
  },
  {
    id: 4,
    title: "Post Title 4",
    content: "More placeholder text for demonstration.",
    timestamp: "2025-02-15 08:45 AM",
    likes: 0,
    code: '// This is dummy code\n#include <iostream>\nusing namespace std;\nint main() {\ncout << "Hello, World!";\nreturn 0;\n}',
    type: "c++",
  },
  {
    id: 5,
    title: "Post Title 5",
    content: "Yet another post with fake data.",
    timestamp: "2025-02-16 03:20 PM",
    likes: 0,
    code: "# This is dummy code\nprint('Hello, World!')",
    type: "python",
  }
];

export async function fetchPosts() {
    // Simulate async fetch
    return new Promise((resolve) => {
        setTimeout(() => resolve(allDummyPosts), 300);
    });
}

export function hasUserLiked(postId) {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    return likedPosts.includes(postId);
}

export async function likePost(postId) {
    let likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    const post = allDummyPosts.find(p => p.id === postId);
    if (!post) return false;

    if (!likedPosts.includes(postId)) {
        likedPosts.push(postId);
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        post.likes += 1;
        return post.likes;
    }
    return post.likes;
}

export async function downloadPost(postId) {
    const post = allDummyPosts.find(p => p.id === postId);
    if (!post) return;

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