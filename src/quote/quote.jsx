import React, {useEffect, useState } from "react";
import "./quote.css";

export default function Quote() {
    const [quote, setQuote] = useState("Loading inspirational quote...");
    const [author, setAuthor] = useState("");

    /*useEffect(() => {
        async function checkLogin() {
            try {
                const res = await fetch("/api/user/me", { credentials: "include" });
                setIsLoggedIn(res.ok);
            } catch {
                setIsLoggedIn(false);
            }
        }
        checkLogin();
    }, []);*/

    const getNewQuote = async () => {
        setQuote("Loading inspirational quote...");
        setAuthor("");
    
        try {
            const response = await fetch("/api/quote");
            const data = await response.json();
            setQuote(data.quote);
            setAuthor(data.author);
        } catch (error) {
            console.error("Error fetching quote:", error);
            setQuote("Failed to load quote.");
            setAuthor("");
        }
    };

    useEffect(() => {
        getNewQuote();
        const interval = setInterval(getNewQuote, 60000); // every 60 seconds
        return () => clearInterval(interval); // cleanup
    }, []);

    return (
        <main>
            <div className="center-container">
                <h2>Please enjoy this inspirational quote.</h2>
                <h4 id="quote">{quote}</h4>
                <p id="author">{author}</p>
                <button onClick={getNewQuote}>Refresh</button>
                <p>Quotes will be coming from <a href="https://zenquotes.io/">here</a>.</p>
            </div>
        </main>
    );
}