import React from "react";

export function Authenticated({ userName, onLogout }) {
  return (
    <div className="center-container">
      <h2>Welcome back, {userName}!</h2>
        <button onClick={ async () => {
          const res = await fetch('/api/auth', {
            method: 'DELETE',
            credentials: 'include',
          });
        if (res.ok) {
          onLogout();
        }
        else {
          alert('Logout failed');
        }
        } }>Log Out</button>
    </div>
  );
}