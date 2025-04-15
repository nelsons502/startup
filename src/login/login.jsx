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