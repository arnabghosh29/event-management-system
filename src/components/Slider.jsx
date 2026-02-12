import React, { useEffect, useState } from "react";
import { fetchAllEvents } from "../api/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const EventCarousel = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const data = await fetchAllEvents();
            setEvents(data);
        };
        getEvents();
    }, []);

    return (
        <div
            id="eventCarousel"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
            data-bs-interval="3000"
            style={{
                width: "100%",
                height: "450px",
                overflow: "hidden",
                borderRadius: "10px",
            }}
        >
            {/* Indicators */}
            <div className="carousel-indicators">
                {events.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target="#eventCarousel"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner" style={{ height: "100%" }}>
                {events.map((event, index) => (
                    <div
                        key={event.id || index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                        style={{ height: "100%" }}
                    >

                        <img
                            src={event.portrait || event.wallpaper}
                            className="d-block w-100"
                            alt={event.title || "Event Image"}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                objectPosition: "center",
                                filter: "brightness(70%)",
                                transition: "transform 1s ease-in-out",
                            }}
                        />


                        <div
                            className="carousel-caption text-start"
                            style={{
                                position: "absolute",
                                bottom: "15%",
                                left: "10%",
                                background: "rgba(0, 0, 0, 0.45)",
                                padding: "15px 25px",
                                borderRadius: "10px",
                                maxWidth: "600px",
                            }}
                        >
                            <h4
                                style={{
                                    color: "#fff",
                                    fontWeight: "700",
                                    textShadow: "0 2px 5px rgba(0,0,0,0.8)",
                                }}
                            >
                                {event.title || "Untitled Event"}
                            </h4>
                            <p
                                style={{
                                    color: "#eaeaea",
                                    fontSize: "0.95rem",
                                    marginTop: "8px",
                                }}
                            >
                                {event.description
                                    ? event.description.slice(0, 120) + "..."
                                    : "No description available."}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#eventCarousel"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#eventCarousel"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default EventCarousel;

