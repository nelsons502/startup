import React from "react";

export function Authenticated({ userName, onLogout }) {
  return (
    <div className="center-container">
      <h2>Welcome back, {userName}!</h2>
      <button onClick={onLogout}>Log Out</button>
    </div>
  );
}