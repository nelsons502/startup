import React, { useState } from "react";

export function Unauthenticated({ userName, onLogin }) {
  const [username, setUsername] = useState(userName || "");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    localStorage.setItem("username", username);
    onLogin(username);
  };

  return (
    <div className="center-container">
      <h2>Please Log In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={!username || !password} onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
}