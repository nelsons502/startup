import React, {useEffect, useState } from "react";
import "./quote.css";

export default function Quote() {
    const [quote, setQuote] = useState("...");
    const [author, setAuthor] = useState("");

    const getNewQuote = async () => {
        setQuote("Loading inspirational quote...");
        setAuthor("");
        // Fetch a random quote from the API
        fetch("/api/quote")
        .then((response) => response.json())
        .then((data) => {
            setQuote(data.quote);
            setAuthor(data.author);
        })
        .catch((error) => {
            console.error("Error fetching quote:", error);
            setQuote("Failed to load quote.");
            setAuthor("");
        });
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