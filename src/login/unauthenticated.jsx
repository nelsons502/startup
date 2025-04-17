import React from "react";

export function Unauthenticated({ userName, onLogin }) {
  const [username, setUsername] = React.useState(userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    try {
      const response = await fetch("/api/auth/login", {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ email: username, password }),
        credentials: "include",
      });
  
      if (response.ok) {
        localStorage.setItem("userName", username);
        onLogin(username);
      } else {
        const body = await response.json();
        setDisplayError(`⚠ Error: ${body.msg}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      setDisplayError("⚠ Error: Login failed.");
    }
  }
  
  async function registerUser() {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ email: username, password }),
        credentials: "include",
      });
  
      if (response.ok) {
        localStorage.setItem("userName", username);
        onLogin(username);
      } else {
        const body = await response.json();
        setDisplayError(`⚠ Error: ${body.msg}`);
      }
    } catch (err) {
      console.error("Register error:", err);
      setDisplayError("⚠ Error: Registration failed.");
    }
  }
  return (
    <div className="center-container">
      <h2>Please Log In</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="your@email.com"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            loginUser();
          }
        }}
      />
      <button disabled={!username || !password} onClick={loginUser}>
        Log In
      </button>
      <button disabled={!username || !password} onClick={registerUser}>
        Register
      </button>
    </div>
  );
}