import React, { useEffect, useState } from "react";
import axios from "axios";

const AllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("Please login to view bookings.");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get(
                    "https://events.deepanwita.fun/booking/api_booking/route/my-bookings/",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setBookings(res.data);
            } catch (err) {
                console.error(err);
                setError("Failed to load bookings.");
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);



    if (loading) return <p style={styles.loading}>Loading bookings...</p>;
    if (error) return <p style={styles.error}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>My Bookings</h2>
            {bookings.length === 0 ? (
                <p style={styles.info}>No bookings found.</p>
            ) : (
                bookings.map((b) => (
                    <div key={b.id} style={styles.card}>
                        <h4>{b.event}</h4>
                        <p><strong>Tier:</strong> {b.ticket_tier_name || b.ticket_tier}</p>
                        <p><strong>Seats:</strong> {b.select_seats}</p>
                        {/* <button
                            style={styles.updateBtn}
                            onClick={() => handleUpdate(b.id, b.select_seats)}
                        >
                            Update Seats
                        </button> */}
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    container: { maxWidth: "700px", margin: "40px auto", padding: "20px", background: "#f0f0f0", color: "#000" },
    title: { textAlign: "center", marginBottom: "20px", color: "#333" },
    card: {
        border: "1px solid #ddd",
        padding: "20px",
        marginBottom: "15px",
        borderRadius: "10px",
        background: "#fff",
        boxShadow: "0 3px 6px rgba(0,0,0,0.1)",
        color: "#000"
    },
    updateBtn: {
        marginTop: "10px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        padding: "10px 20px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold"
    },
    loading: { textAlign: "center", marginTop: "40px", color: "#000" },
    error: { color: "red", textAlign: "center", marginTop: "40px" },
    info: { textAlign: "center", color: "#333" },
};
export default AllBookings