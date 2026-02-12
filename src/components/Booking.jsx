import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchSingleEvent, fetchEventTiers } from "../api/api";

const BookTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch Event & Tiers
  useEffect(() => {
    const loadEvent = async () => {
      try {
        const singleEvent = await fetchSingleEvent(id);
        if (!singleEvent) {
          setErrorMsg("Event not found.");
          return;
        }
        setEvent(singleEvent);

        // available ticket count dekhabe
        const tierData = await fetchEventTiers(singleEvent.title);
        setTiers(tierData);
      } catch (err) {
        console.error("Error fetching event:", err);
        setErrorMsg("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading event...</p>;
  if (!event) return <p className="text-center text-danger">{errorMsg}</p>;

  const imgUrl = event.wallpaper
    ? event.wallpaper.startsWith("http")
      ? event.wallpaper
      : `https://events.deepanwita.fun/${event.wallpaper}`
    : "https://via.placeholder.com/800x400?text=No+Image";

  // Handle Book booton
  const handleBookNow = () => {
    navigate("/book-form", { state: { event, tiers } });
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">

        <img
          src={imgUrl}
          alt={event.title}
          className="card-img-top"
          style={{ height: "400px", objectFit: "cover" }}
        />

        <div className="card-body">

          <h2 className="card-title text-primary mb-3">{event.title}</h2>


          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>

          {/* Event Description */}
          <p className="text-muted" style={{ whiteSpace: "pre-line" }}>
            {event.description}
          </p>

          {/* Tickets Available */}
          <p className="mt-3">
            <strong>Tickets:</strong>{" "}
            {tiers.length > 0 ? tiers[0].available_seats : "N/A"} available
          </p>

          {/* Book Button */}
          <button className="btn btn-success px-4 mt-3" onClick={handleBookNow}>
            Book Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookTicket;
