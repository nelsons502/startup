import React, {useEffect, useState } from "react";

export default function Quote() {
    const [quote, setQuote] = useState("Loading inspirational quote...");
    const [author, setAuthor] = useState("");

    const getNewQuote = async () => {
        //console.log("fetching quotes");
        try {
            const response = await fetch("https://dummyjson.com/quotes/random"); // TODO: change to https://zenquotes.io/ when I get the server running (requires server to implement)
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