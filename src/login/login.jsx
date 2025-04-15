import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder: In the future, replace this with an API call to authenticate
        localStorage.setItem("username", username);
        localStorage.setItem("password", password); // NOTE: Do NOT store passwords like this in production
        // Notify other components of login state change
        window.dispatchEvent(new Event("authChange"));

        // Redirect to the chat page
        navigate("/chat");
    };

    useEffect(() => {
        const user = localStorage.getItem("username");
        const pass = localStorage.getItem("password");
    
        if (!user || !pass) {
            // Already on login page, no need to redirect
            return;
        }
    
        // If somehow still logged in, redirect to chat
        navigate("/chat");
    }, []);

    return (
        <main>
            <div className="center-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Log In</button>
                </form>
                <img src="/focus_logo.png" className="logo" alt="Focus Logo" />
            </div>
        </main>
    );
}