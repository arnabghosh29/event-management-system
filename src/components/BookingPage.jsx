import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../context/AuthContext";

const BookingPage = () => {
    const { token } = useContext(AuthContext); //  Auth token
    const [bookings, setBookings] = useState([]);
    const [form, setForm] = useState({
        event_title: "",
        ticket_tier_name: "",
        select_seats: 1,
    });
    const [loading, setLoading] = useState(false);
    const [editBooking, setEditBooking] = useState(null);
    const [message, setMessage] = useState("");


    const fetchBookings = async () => {
        try {
            const res = await axios.get(
                "https://events.deepanwita.fun/booking/api_booking/route/",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setBookings(res.data);
        } catch (err) {
            console.error(" Fetch Error:", err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    //  Create Booking
    const handleBook = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(
                "https://events.deepanwita.fun/booking/api_booking/route/",
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setMessage(" Ticket booked successfully!");
            setForm({ event_title: "", ticket_tier_name: "", select_seats: 1 });
            fetchBookings();
        } catch (err) {
            setMessage(" Booking failed!");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    //  Update Booking (seat number)
    const handleUpdate = async (id) => {
        try {
            await axios.patch(
                `https://events.deepanwita.fun/booking/api_booking/route/${id}/`,
                { select_seats: editBooking.select_seats },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setMessage(" Booking updated successfully!");
            setEditBooking(null);
            fetchBookings();
        } catch (err) {
            setMessage(" Update failed!");
            console.error(err);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4"> Ticket Booking System</h1>

            {/*  Booking Form */}
            <div className="card p-4 shadow-sm mb-5">
                <h4 className="mb-3">Book a New Ticket</h4>
                <form onSubmit={handleBook}>
                    <div className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label">Event Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.event_title}
                                onChange={(e) =>
                                    setForm({ ...form, event_title: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Ticket Tier</label>
                            <input
                                type="text"
                                className="form-control"
                                value={form.ticket_tier_name}
                                onChange={(e) =>
                                    setForm({ ...form, ticket_tier_name: e.target.value })
                                }
                                required
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Seats</label>
                            <input
                                type="number"
                                min="1"
                                className="form-control"
                                value={form.select_seats}
                                onChange={(e) =>
                                    setForm({ ...form, select_seats: parseInt(e.target.value) })
                                }
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary mt-4 px-4"
                        disabled={loading}
                    >
                        {loading ? "Booking..." : "Book Ticket"}
                    </button>
                </form>

                {message && <div className="alert alert-info mt-3">{message}</div>}
            </div>

            {/* All Bookings Table */}
            <div className="card p-4 shadow-sm">
                <h4 className="mb-3">My Bookings</h4>
                {bookings.length === 0 ? (
                    <p>No bookings found.</p>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered align-middle">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Event</th>
                                    <th>Tier</th>
                                    <th>Seats</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((b, index) => (
                                    <tr key={b.id}>
                                        <td>{index + 1}</td>
                                        <td>{b.event_title}</td>
                                        <td>{b.ticket_tier_name}</td>
                                        <td>
                                            {editBooking?.id === b.id ? (
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={editBooking.select_seats}
                                                    onChange={(e) =>
                                                        setEditBooking({
                                                            ...editBooking,
                                                            select_seats: parseInt(e.target.value),
                                                        })
                                                    }
                                                    className="form-control"
                                                    style={{ width: "80px" }}
                                                />
                                            ) : (
                                                b.select_seats
                                            )}
                                        </td>
                                        <td>
                                            {editBooking?.id === b.id ? (
                                                <>
                                                    <button
                                                        className="btn btn-success btn-sm me-2"
                                                        onClick={() => handleUpdate(b.id)}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => setEditBooking(null)}
                                                    >
                                                        Cancel
                                                    </button>
                                                </>
                                            ) : (
                                                <button
                                                    className="btn btn-outline-primary btn-sm"
                                                    onClick={() => setEditBooking(b)}
                                                >
                                                    Edit
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
