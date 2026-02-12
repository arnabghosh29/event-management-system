import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { bookEventTicket } from "../api/api";
import { Form, Button, Alert } from "react-bootstrap";
import "./BookTicket.css";

const BookTicket = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const { event, tiers } = state || {};
    const [selectedTier, setSelectedTier] = useState(tiers?.[0]?.name || "");
    const [seats, setSeats] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    if (!event) {
        return <p className="text-center text-light mt-5">No event selected.</p>;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !token) {
            setErrorMessage("Please login to book tickets.");
            return;
        }

        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const payload = {
                event_title: event.title,
                ticket_tier_name: selectedTier,
                select_seats: seats,
                user: user.id,
            };

            const res = await bookEventTicket(token, payload);


            setSuccessMessage(
                `Booking successful! You have booked ${seats} seat(s) in "${selectedTier}" tier for "${event.title}".`
            );

            // 2 seconds pore redirect
            setTimeout(() => {
                navigate("/ticket", { state: { ticket: res } });
            }, 2000);
        } catch (err) {
            setErrorMessage(
                err.response?.data?.user || "Booking failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-5 text-light">
            <div className="card booking-card p-4">
                <h3 className="mb-4 text-center text-info">{event.title} - Booking</h3>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Ticket Tier</Form.Label>
                        <Form.Select
                            value={selectedTier}
                            onChange={(e) => setSelectedTier(e.target.value)}
                        >
                            {tiers.map((tier) => (
                                <option key={tier.id} value={tier.name}>
                                    {tier.name} — RS:{tier.price} (Seats: {tier.available_seats})
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Number of Seats</Form.Label>
                        <Form.Control
                            type="number"
                            min={1}
                            value={seats}
                            onChange={(e) => setSeats(Number(e.target.value))}
                        />
                    </Form.Group>

                    {errorMessage && (
                        <Alert variant="danger">{errorMessage}</Alert>
                    )}

                    {successMessage && (
                        <Alert variant="success">{successMessage}</Alert>
                    )}

                    <Button
                        variant="info"
                        type="submit"
                        className="w-100 mt-3"
                        disabled={loading}
                    >
                        {loading ? "Booking..." : "Confirm Booking"}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default BookTicket;


