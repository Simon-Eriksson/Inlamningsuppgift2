import { useEffect, useState } from "react";

function Quote({ author, text }) {
    return (
        <article>
            <span>
                {text} - {author}
            </span>
        </article>
    );
}

export function AllQuotes() {
    const [quotes, setQuotes] = useState([]);

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

    const savedQuotes = JSON.parse(localStorage.getItem("quotes") || "[]");
    const allQuotes = [...savedQuotes, ...quotes];

    const mapQuotes = () => {
        return allQuotes.map((quote, index) => (
            <li key={index}>
                <Quote author={quote.author.split(",")[0]} text={quote.text} />
            </li>
        ));
    };

    return (
        <div className="App">
            <section>
                <ol>{mapQuotes()}</ol>
            </section>
        </div>
    )
}
