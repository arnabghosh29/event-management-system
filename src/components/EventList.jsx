import React, { useEffect, useState } from "react";
import axios from "axios";

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(
                    "https://events.deepanwita.fun/event/api/route/all-events/"
                );
                console.log(" Events fetched:", res.data);
                setEvents(res.data);
            } catch (err) {
                console.error(" Fetch Error:", err);
                setError("Failed to load events. (CORS or network issue)");
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    if (loading) return <p style={styles.loading}>Loading events...</p>;
    if (error) return <p style={styles.error}>{error}</p>;

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>🎉 Upcoming Events</h1>

            {events.map((event, index) => (
                <div key={index} style={styles.card}>
                    {/* Image + Details */}
                    <div style={styles.topSection}>
                        {/* Left - Image */}
                        <div style={styles.imageWrapper}>
                            <img
                                src={
                                    event.portrait
                                        ? event.portrait.startsWith("http")
                                            ? event.portrait
                                            : `https://events.deepanwita.fun${event.portrait}`
                                        : event.wallpaper
                                            ? event.wallpaper.startsWith("http")
                                                ? event.wallpaper
                                                : `https://events.deepanwita.fun${event.wallpaper}`
                                            : "https://via.placeholder.com/600x400?text=No+Image"
                                }
                                alt={event.title || "Event Image"}
                                style={styles.image}
                                onError={(e) => {
                                    e.target.src =
                                        "https://via.placeholder.com/600x400?text=No+Image";
                                }}
                            />
                        </div>

                        {/* Right - Details */}
                        <div style={styles.details}>
                            <h2 style={styles.eventTitle}>{event.title || "Untitled Event"}</h2>
                            <p><strong>Date:</strong> {event.date || "To be announced"}</p>
                            <p><strong>Location:</strong> {event.location || "Not specified"}</p>
                            <p><strong>Tickets:</strong> {event.ticket_tiers?.length || 0} tier(s)</p>

                            <button
                                style={styles.bookButton}
                                onClick={() => alert(`Booking for: ${event.title}`)}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>

                    {/* Full Description Below */}
                    <div style={styles.fullInfo}>
                        <h3 style={{ marginBottom: "10px" }}>About this Event</h3>
                        <p>{event.description || "No detailed information available."}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Styles
const styles = {
    container: {
        maxWidth: "950px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Inter, sans-serif",
        color: "black",
    },
    heading: {
        textAlign: "center",
        color: "black",
        marginBottom: "40px",
    },
    card: {
        background: "white",
        marginBottom: "50px",
        borderRadius: "16px",
        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        overflow: "hidden",
        border: "1px solid #ddd",
    },
    topSection: {
        display: "flex",
        flexWrap: "wrap",
        background: "#fafafa",
    },
    imageWrapper: {
        flex: "1 1 45%",
        minWidth: "300px",
        height: "350px",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },
    details: {
        flex: "1 1 50%",
        padding: "25px",
        color: "black",
    },
    eventTitle: {
        margin: "0 0 10px 0",
        fontWeight: "700",
        color: "black",
    },
    bookButton: {
        marginTop: "15px",
        background: "#007bff",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    fullInfo: {
        padding: "25px",
        background: "#fff",
        borderTop: "1px solid #eee",
        color: "black",
    },
    loading: {
        textAlign: "center",
        marginTop: "50px",
    },
    error: {
        textAlign: "center",
        color: "red",
        marginTop: "40px",
    },
};

export default EventPage;



