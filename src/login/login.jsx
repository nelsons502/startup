import React from "react";
import { Authenticated } from "./authenticated";
import { Unauthenticated } from "./unauthenticated";
import { AuthState } from "./authState";

export default function Login({ userName, authState, onAuthChange }) {
  return (
    <main>
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to Focus Coding!</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}