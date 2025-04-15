import React, { useEffect, useState } from 'react';
import './app.css';

import { BrowserRouter as Router, NavLink, Route, Routes } from 'react-router-dom';
import Login from './login/login';
import Chat from './chat/chat';
import Posts from './posts/posts';
import Quote from './quote/quote';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = () => {
            const username = localStorage.getItem("username");
            const password = localStorage.getItem("password");
            setIsLoggedIn(!!username && !!password);
        };
    
        checkLogin(); // initial load
        window.addEventListener("authChange", checkLogin);
    
        return () => {
            window.removeEventListener("authChange", checkLogin);
        };
    }, []);

    const handleAuthClick = () => {
        if (isLoggedIn) {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            setIsLoggedIn(false);
            window.dispatchEvent(new Event("authChange"));
        } else {
            window.location.href = "/login";
        }
    };

    return (
    <Router>
        <div>
            <header>
                <nav>
                    <div className='company_name'>Focus Coding</div>

                    <ul>
                        {isLoggedIn && (
                            <>
                                <li><NavLink to="/chat">Chat</NavLink></li>
                                <li><NavLink to="/posts">Posts</NavLink></li>
                                <li><NavLink to="/quote">Quote</NavLink></li>
                            </>
                        )}
                    </ul>
                    <div className="auth-button">
                        <button onClick={handleAuthClick}>
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    </div>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<WelcomeMessage />} exact />
                    <Route path="/login" element={<Login />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/quote" element={<Quote />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

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

function WelcomeMessage() {
    return (
        <div className="welcome-container">
            <h1 className="welcome-message">Welcome to Focus Coding!</h1>
            <img src="/focus_logo.png" className="logo" alt="Focus Logo"></img>
        </div>
    );
}