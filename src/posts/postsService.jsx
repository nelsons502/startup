export async function getPosts() {
    console.log("Fetching posts from server");
    const res = await fetch("/api/posts", { credentials: "include" });
    if (!res.ok) {
        throw new Error("Failed to fetch posts: postsService error");
    }
    return await res.json();
}

export async function likePost(postId) {
    const res = await fetch(`/api/posts/${postId}/like`, {
        method: "POST",
        credentials: "include"
    });

    if (!res.ok) {
        throw new Error("Failed to like post: postsService error");
    }

    const updatedPost = await res.json();
    return updatedPost.likes;
}

export async function downloadPost(postId) {
    console.log("Downloading post with ID:", postId);
    const res = await fetch(`/api/posts/${postId}/download`, {
        credentials: "include"
    });
    if (!res.ok) return;

    const postInfo = await res.json();
    //console.log("Post info:", postInfo);

    const fileName = postInfo.filename;

    const blob = new Blob([postInfo.code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export async function createPost(postData) {
    const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(postData),
    });

    if (!res.ok) {
        throw new Error("Failed to create post");
    }

    return await res.json();
}