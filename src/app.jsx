import React from 'react';
import './app.css';

import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import Login from './login/login';
import Chat from './chat/chat';
import Posts from './posts/posts';
import Quote from './quote/quote';
import { AuthState } from './login/authState';

export default function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
    <Router>
        <div>
            <header>
                <nav>
                    <div className='company_name'>Focus Coding</div>

                    <ul>
                    <li className='nav-item'>
                            <NavLink className='nav-link' to=''>
                            Login
                            </NavLink>
                        </li>
                        {authState === AuthState.Authenticated && (
                            <li className='nav-item'>
                            <NavLink className='nav-link' to='chat'>
                                Chat
                            </NavLink>
                            </li>
                        )}
                        {authState === AuthState.Authenticated && (
                            <li className='nav-item'>
                            <NavLink className='nav-link' to='posts'>
                                Posts
                            </NavLink>
                            </li>
                        )}
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='quote'>
                            Quote
                            </NavLink>
                        </li>
                    </ul>
                    {/* This button is being temporarily removed
                    <div className="auth-button">
                        <button onClick={handleAuthClick}>
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    </div>*/}
                </nav>
            </header>


            <Routes>
            <Route
            path='/'
            element={
              <Login
                userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}/>}exact/>
                <Route path="/chat" element={<Chat userName={userName}/>} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/quote" element={<Quote />} />
                <Route path="*" element={<NotFound />} />
            </Routes>


            <footer>
            <p>If you have any questions or feedback, feel free to reach out via text (at <a href="tel:+14802021476">480-202-1476</a>) or <a href="mailto:nmschnepf@gmail.com">email</a>.</p>
                <p>GitHub repo: <a href="https://github.com/nelsons502/startup">startup</a>.</p>
            </footer>
        </div>
    </Router>
    );
}

function NotFound() {
    return <h1>404 Not Found</h1>;
}