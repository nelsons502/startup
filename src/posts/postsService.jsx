// future backend interaction (fetch, like, download, etc)

const hardcodedPosts = [
    {
        id: 1,
        title: "Post Title 1",
        content: "Content of the post goes here for post 1.",
        timestamp: "2025-02-12 10:30 AM",
        code: "console.log('Post 1 Code');"
    },
    {
        id: 2,
        title: "Post Title 2",
        content: "Content of the post goes here for post 2.",
        timestamp: "2025-02-13 11:00 AM",
        code: "console.log('Post 2 Code');"
    },
    {
        id: 3,
        title: "Post Title 3",
        content: "Content of the post goes here for post 3.",
        timestamp: "2025-02-14 09:15 AM",
        code: "console.log('Post 3 Code');"
    }
];

export async function fetchPosts() {
    // Simulate async fetch
    return new Promise((resolve) => {
        setTimeout(() => resolve(hardcodedPosts), 300);
    });
}

export function hasUserLiked(postId) {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    return likedPosts.includes(postId);
}

export async function likePost(postId) {
    let likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || [];
    if (!likedPosts.includes(postId)) {
        likedPosts.push(postId);
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
        return true;
    }
    return false;
}

export async function downloadPost(postId) {
    const post = hardcodedPosts.find(p => p.id === postId);
    if (!post) return;

    const blob = new Blob([post.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${post.title.replace(/\s+/g, "_")}.js`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export function downloadDummyCodeFile(filename = "dummy.py") {
    const content = "# this is a dummy file";
    const blob = new Blob([content], { type: "text/x-python" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}