import React from "react";

export default function Login() {
    return (
        <main>
            <div class="center-container">
                <h1>Login</h1>
                <form action="/chat" method="get">
                    <input type="text" name="username" placeholder="Username" required></input>
                    <input type="password" name="password" placeholder="Password" required></input>
                    <button type="submit">Log In</button>
                </form>
                <img src="/focus_logo.png" className="logo" alt="Focus Logo"></img>
            </div>
        </main>

    );
}