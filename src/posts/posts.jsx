import React from "react";

export default function Posts() {
    return (
        <main>
            <div class="center-container">
                <h2>Recent Posts</h2>
                
                <div class="post-card">
                <h4>Post Title 1</h4>
                <p>Content of the post goes here. This is a short example of what a post might look like.</p>
                <button class="like-button" data-post-id="1" data-post-title="Post Title 1">Like</button>
                <button class="download-button" data-post-id="1" data-post-title="Post Title 1">Download</button>
                <p class="timestamp">Posted on: 2025-02-12 10:30 AM</p>
                </div>
                
                <div class="post-card">
                <h4>Post Title 2</h4>
                <p>Content of the post goes here. This is a short example of what a post might look like.</p>
                <button class="like-button" data-post-id="2" data-post-title="Post Title 2">Like</button>
                <button class="download-button" data-post-id="2" data-post-title="Post Title 2">Download</button>
                <p class="timestamp">Posted on: 2025-02-12 10:30 AM</p>
                </div>
                
                <div class="post-card">
                <h4>Post Title 3</h4>
                <p>Content of the post goes here. This is a short example of what a post might look like.</p>
                <button class="like-button" data-post-id="3" data-post-title="Post Title 3">Like</button>
                <button class="download-button" data-post-id="3" data-post-title="Post Title 3">Download</button>
                <p class="timestamp">Posted on: 2025-02-12 10:30 AM</p>
                </div>
                
                <button >Load More Posts</button>
            </div>
        </main>
    );
}