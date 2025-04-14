import React from "react";

export default function Chat() {
    return (
        <main>
            {/* Sidebar for recent chats */}
            <div class="sidebar">
              <h2>Recent Chats</h2>
              <div class="chat-list">
                <div class="chat-item active">Chat with AI (current)</div>
                <div class="chat-item">Chat from yesterday</div>
                <div class="chat-item">Chat from two days ago</div>
                <div class="chat-item">Chat from two days ago in the morning</div>
                <div class="chat-item">Chat from a week ago</div>
              </div>
            </div>
            
            {/* Main chat content */}
            <div class="main-content">
              <div class="chat-header">
                Current Chat [Current topic]
              </div>
              <div class="chat-body">
                <p class="usr-msg">Can you help me understand recursion?</p>
                <p class="ai-msg">Sure! Recursion is a method of solving problems where a function calls itself as a subroutine...</p>
              </div>
              <div class="chat-footer">
                <input type="text" placeholder="Type your message"></input>
                <button>Send</button>
              </div>
            </div>

      </main>
    );
}