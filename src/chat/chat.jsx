import React from "react";

export default function Chat() {
    return (
        <main>
            {/* Sidebar for recent chats */}
            <div className="sidebar">
              <h2>Recent Chats</h2>
              <div className="chat-list">
                <div className="chat-item active">Chat with AI (current)</div>
                <div className="chat-item">Chat from yesterday</div>
                <div className="chat-item">Chat from two days ago</div>
                <div className="chat-item">Chat from two days ago in the morning</div>
                <div className="chat-item">Chat from a week ago</div>
              </div>
            </div>
            
            {/* Main chat content */}
            <div className="main-chat">
              <div className="chat-header">
                Current Chat [Current topic]
              </div>
              <div className="chat-body">
                <p className="usr-msg">Can you help me understand recursion?</p>
                <p className="ai-msg">Sure! Recursion is a method of solving problems where a function calls itself as a subroutine...</p>
              </div>
              <div className="chat-footer">
                <input type="text" placeholder="Type your message"></input>
                <button>Send</button>
              </div>
            </div>

      </main>
    );
}