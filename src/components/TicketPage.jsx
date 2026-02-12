import React from "react";
import { useLocation } from "react-router-dom";

const TicketPage = () => {
  const location = useLocation();
  const { ticket } = location.state || {};

  if (!ticket) return <p>No ticket found.</p>;

  return (
    <div className="container my-5">
      <h2>Your Ticket</h2>

      <p><strong>Seats:</strong> {ticket.select_seats}</p>
      <p><strong>Booking ID:</strong> {ticket.id}</p>
    </div>
  );
};

export default TicketPage;
