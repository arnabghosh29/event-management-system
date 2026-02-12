import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query") || "";
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!query) return;

        const fetchResults = async () => {
            setLoading(true);
            setError("");
            try {
                // Ticket/Tiers search API
                const res = await axios.get(
                    `https://events.deepanwita.fun/tiers/api_tiers/public_route/?search=${encodeURIComponent(query)}`
                );
                setResults(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch ticket results.");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [query]);

    if (loading) return <p className="text-center mt-5">Loading ticket results...</p>;
    if (error) return <p className="text-center text-danger mt-5">{error}</p>;

    return (
        <div className="container my-5">
            <h2 className="mb-4">Ticket Search Results for "{query}"</h2>
            {results.length === 0 ? (
                <p>No tickets found.</p>
            ) : (
                <div className="row g-4">
                    {results.map((ticket) => (
                        <div key={ticket.id} className="col-md-6 col-sm-12">
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{ticket.name}</h5>
                                    <p className="card-text">{ticket.description || "No description available"}</p>
                                    <p className="card-text">
                                        <small className="text-muted">Price: {ticket.price || "N/A"}</small>
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">Event: {ticket.event_title || "Unknown"}</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;


