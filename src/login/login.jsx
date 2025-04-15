import React, { useState, useEffect } from "react";
import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";
import { AuthState } from "./authState";

export default function LoginWrapper() {
  const [userName, setUserName] = useState("");
  const [authState, setAuthState] = useState(AuthState.Unknown);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUserName(storedUser);
      setAuthState(AuthState.Authenticated);
    } else {
      setAuthState(AuthState.Unauthenticated);
    }
  }, []);

  function handleAuthChange(name, newState) {
    setUserName(name);
    setAuthState(newState);
    setTimeout(() => {
      window.dispatchEvent(new Event("authChange"));
    }, 100);
    if (newState === AuthState.Unauthenticated) {
      localStorage.removeItem("username");
    } else {
      localStorage.setItem("username", name);
    }
    window.dispatchEvent(new Event("authChange"));
    window.location.href = "/";
  }

  return (
    <main>
      <h1>Welcome to Focus Coding</h1>
      {authState === AuthState.Authenticated && (
        <Authenticated userName={userName} onLogout={() => handleAuthChange("", AuthState.Unauthenticated)} />
      )}
      {authState === AuthState.Unauthenticated && (
        <Unauthenticated
          userName={userName}
          onLogin={(name) => handleAuthChange(name, AuthState.Authenticated)}
        />
      )}
    </main>
  );
}