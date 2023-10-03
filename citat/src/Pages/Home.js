import React, { useState, useEffect } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
// import "./QuoteStyle.css"

export function Home() {

    let buttonStyles = { color: "white", size: "20px", background: "#625ac4" };

    const [quotes, setQuotes] = useState([]);
    const [quote, setQuote] = useState({
        text: "Whatever the mind of man can conceive and believe, it can achieve.",
        author: "Napoleon Hill",
    });

    useEffect(() => {
        async function loadQuotes() {
            try {
                const response = await fetch("https://type.fit/api/quotes");
                const data = await response.json();
                setQuotes(data);
            } catch (error) {
                console.error("Error loading quotes:", error);
            }
        }
        loadQuotes();
    }, []);

    const random = () => {
        const select = quotes[Math.floor(Math.random() * quotes.length)];
        setQuote(select)
    }

    const handleCopyToClipboard = () => {
        const textToCopy = `${quote.text} - ${quote.author.split(",")[0]}`;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                console.log("Text copied to clipboard: ", textToCopy);
            });
    };

    return (
        <div className="container">
            <div className="quote">{quote.text}</div>
            <div>
                <div className="line"></div>
                <div className="bottom">
                    <div className="author">- {quote.author.split(",")[0]}</div>
                    <div className="icons">
                        <Link to="/CreateQuote">
                            <button style={buttonStyles}>Create quote</button>
                        </Link>
                        <Link to="/AllQuotes">
                            <button style={buttonStyles}>See all quotes</button>
                        </Link>
                        <button style={buttonStyles} onClick={() => { random() }}>New quote</button>
                        <CopyToClipboard text={`${quote.text} - ${quote.author.split(",")[0]}`}>
                            <button style={buttonStyles} onClick={handleCopyToClipboard}>
                                Copy quote
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
        </div>
    )
}
