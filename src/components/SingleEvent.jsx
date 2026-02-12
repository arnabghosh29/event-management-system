import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { fetchSingleEvent, fetchEventTiers } from "../api/api";
import "./SingleEvent.css";
const SingleEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      setLoading(true);


      const singleEvent = await fetchSingleEvent(id);
      if (!singleEvent) {
        setLoading(false);
        return;
      }
      setEvent(singleEvent);


      const tierData = await fetchEventTiers(singleEvent.title);
      setTiers(tierData);

      setLoading(false);
    };

    loadEvent();
  }, [id]);

  if (loading) return <p className="text-center mt-5 text-light">Loading...</p>;
  if (!event)
    return <p className="text-center mt-5 text-danger">Event not found.</p>;

  const handleBookNow = () => {
    if (!user) {
      alert("Please login to book tickets.");
      navigate("/login");
      return;
    }
    navigate(`/book/${event.id}`, { state: { event, tiers } });
  };

  return (
    <div className="container my-5 single-event-container text-light">
      <div className="row">
        {/* Left: Event Image */}
        <div className="col-md-5">
          <img
            src={
              event.portrait?.startsWith("http")
                ? event.portrait
                : `https://events.deepanwita.fun${event.portrait || event.wallpaper}`
            }
            alt={event.title}
            className="img-fluid event-image shadow rounded"
          />
        </div>

        {/* Right: Event Details */}
        <div className="col-md-7 d-flex flex-column justify-content-between">
          <div className="event-details p-3 rounded">
            <h2 className="event-title">{event.title}</h2>
            <p>{event.description || "No description available."}</p>

            <ul className="list-unstyled mt-3">
              <li><strong>Date:</strong> {event.date || "TBA"}</li>
              <li><strong>Time:</strong> {event.time || "TBA"}</li>
              <li><strong>Location:</strong> {event.location || "Online"}</li>
              <li><strong>Tickets:</strong> {tiers.length} available</li>
            </ul>
          </div>

          <div className="mt-3 d-flex justify-content-center">
            <button className="btn btn-info btn-lg" onClick={handleBookNow} disabled={tiers.length === 0}>
              Book Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
