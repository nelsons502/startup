import React, { useState } from "react";

export function Unauthenticated({ userName, onLogin, onRegister }) {
  const [username, setUsername] = useState(userName || "");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: username, password }),
      });
      if (res.ok) {
        onLogin(username);
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login error');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: username, password }),
      });
      if (res.ok) {
        onRegister(username);
      } else {
        alert('Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      alert('Registration error');
    }
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
      />
      <button disabled={!username || !password} onClick={handleLogin}>
        Log In
      </button>
      <button disabled={!username || !password} onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}