import React, { useState, useEffect } from "react";
import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";
import { AuthState } from "./authState";

export default function LoginWrapper() {
  const [userName, setUserName] = useState("");
  const [authState, setAuthState] = useState(AuthState.Unknown);

  useEffect(() => {
    let isMounted = true;

    async function checkUser() {
      try {
        const res = await fetch('/api/user/me', { credentials: 'include' });
        if (!isMounted) return;

        if (res.ok) {
          const data = await res.json();
          setUserName(data.email);
          setAuthState(AuthState.Authenticated);
        } else {
          console.warn("User not authenticated:", res.status);
          setAuthState(AuthState.Unauthenticated);
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
        if (isMounted) setAuthState(AuthState.Unauthenticated);
      }
    }

    checkUser();

    return () => {
      isMounted = false;
    };
  }, []);

  function handleAuthChange(name, newState) {
    setUserName(name);
    setAuthState(newState);
    setTimeout(() => {
      window.dispatchEvent(new Event("authChange"));
      window.location.href = "/";
    }, 100);
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
          onRegister={(name) => handleAuthChange(name, AuthState.Authenticated)}
        />
      )}
    </main>
  );
}