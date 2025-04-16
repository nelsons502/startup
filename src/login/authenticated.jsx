import React from "react";
import { useNavigate } from "react-router-dom";

export function Authenticated({ userName, onLogout }) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, { method: "delete" })
      .catch(() => {})
      .finally(() => {
        localStorage.removeItem("userName");
        // update the window back to the login page
        navigate("/");
        onLogout();
      });
  }

  return (
    <div className="center-container">
      <h2>Welcome, {userName}!</h2>
      <button onClick={() => navigate("/chat")}>Chat</button>
      <button onClick={() => navigate("/posts")}>Posts</button>
      <button onClick={logout}>Logout</button>
      <p>Enjoy your AI Assistant and Posts from fellow students!</p>
    </div>
  );
}