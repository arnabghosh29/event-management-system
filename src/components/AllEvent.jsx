import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, InputGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { fetchAllEvents } from "../api/api";

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const loadEvents = async (search = "") => {
        setLoading(true);
        setError("");
        try {
            if (search.trim()) {
                // search API
                const res = await axios.get(
                    `https://events.deepanwita.fun/event/api/public_route/?search=${encodeURIComponent(search)}`
                );
                setEvents(res.data);
            } else {
                const data = await fetchAllEvents();
                setEvents(data);
            }
        } catch (err) {
            console.error("Fetch Error:", err);
            setError("Failed to load events. (Check network or server)");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        loadEvents(query);
    };

    if (loading) return <p className="text-center mt-5">Loading events...</p>;
    if (error) return <p className="text-center text-danger mt-5">{error}</p>;

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">All Events</h1>

            {/* Search Bar */}
            <Form onSubmit={handleSearch} className="mb-4">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Search events..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type="submit" variant="info">
                        Search
                    </Button>
                </InputGroup>
            </Form>

            <div className="row g-4">
                {events.length === 0 && <p className="text-center">No events found.</p>}
                {events.map((event) => (
                    <div key={event.id} className="col-md-4 col-sm-6">
                        <div
                            className="card h-100 shadow-lg border-0 rounded-3"
                            style={{
                                background: "linear-gradient(135deg, rgba(30,30,30,0.85), rgba(10,10,10,0.9))",
                                border: "1px solid rgba(0,255,255,0.2)",
                                color: "#e0f7fa",
                                cursor: "pointer",
                                transition: "transform 0.3s",
                            }}
                            onClick={() => navigate(`/event/${event.id}`)}
                        >
                            <img
                                src={
                                    event.wallpaper
                                        ? event.wallpaper.startsWith("http")
                                            ? event.wallpaper
                                            : `https://events.deepanwita.fun${event.wallpaper}`
                                        : event.portrait
                                            ? event.portrait.startsWith("http")
                                                ? event.portrait
                                                : `https://events.deepanwita.fun${event.portrait}`
                                            : "https://via.placeholder.com/400x200?text=No+Image"
                                }
                                alt={event.title || "Event Image"}
                                className="card-img-top"
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body d-flex flex-column justify-content-between">
                                <h5 className="card-title fw-bold text-info">{event.title || "Untitled Event"}</h5>
                                <p className="card-text mb-1"><strong>Date:</strong> {event.date || "TBA"}</p>
                                <p className="card-text mb-1"><strong>Time:</strong> {event.time || "TBA"}</p>
                                <p className="card-text mb-1"><strong>Location:</strong> {event.location || "Online"}</p>
                                <p className="card-text mb-1"><strong>Tickets:</strong> {event.ticket_tiers?.length || 0} tier(s)</p>
                                <Button
                                    className="mt-2"
                                    variant="info"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        navigate(`/event/${event.id}`);
                                    }}
                                >
                                    Book Now
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventPage;

