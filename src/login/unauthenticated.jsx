import React from "react";

export function Unauthenticated({ userName, onLogin }) {
  const [username, setUsername] = React.useState(userName);
  const [password, setPassword] = React.useState("");
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function registerUser() {
    loginOrCreate(`/api/auth/register`);
  }
  async function loginOrCreate(endpoint) {
    console.log("loginOrCreate", endpoint);
    const response = await fetch(endpoint, {
      // "put" for login, "post" for register
      method: endpoint.includes("login") ? "put" : "post",
      body: JSON.stringify({ email: username, password: password }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      credentials: "include",
    });
    if (response?.status === 200) {
      localStorage.setItem("userName", username);
      onLogin(username);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
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