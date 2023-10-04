import React, { useEffect, useState } from "react";

export function CreateQuote() {
    const [newQuoteText, setNewQuoteText] = useState("");
    const [quotes, setQuotes] = useState([]);

    useEffect(() => {
        const savedQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
        setQuotes(savedQuotes);
    }, []);

    const addQuote = () => {
        if (newQuoteText !== "") {

            const newQuote = {
                id: quotes.length,
                author: "You",
                text: newQuoteText,
            };

            setQuotes([...quotes, newQuote]);

            setNewQuoteText("");

            localStorage.setItem("quotes", JSON.stringify([...quotes, newQuote]));
        }
    };

    return (
        <div className="container">
            <div>
                <label>Enter your quote:</label>
                <input
                    type="text"
                    value={newQuoteText}
                    onChange={(event) => setNewQuoteText(event.target.value)}
                />
                <button onClick={addQuote}>Add Quote</button>
            </div>
            <section>
                <h4>Your Quotes:</h4>
                <ol>
                    {quotes.map((quote) => (
                        <li key={quote.id}>
                            {quote.text} - {quote.author}
                        </li>
                    ))}
                </ol>
            </section>
        </div>
    );
}

export default CreateQuote;