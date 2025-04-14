import React from "react";

export default function Quote
() {
    return (
        <main>
            <div class="center-container">
                <h2>Please enjoy this inspirational quote.</h2>
                <h4 id="quote">Quote goes here.</h4>
                <p id="author">Author</p>
                <button onclick="getNewQuote()">Refresh Quote</button>
                <p>Quotes are coming from <a href="https://programming-quotesapi.vercel.app">here</a>.</p>
            </div>
        </main>
    );
}