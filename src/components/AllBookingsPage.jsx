import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AllBookingsPage = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      alert("Please login to view bookings.");
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {

        let url = "https://events.deepanwita.fun/booking/api_booking/route/";
        if (user.role === "user") {
          url += `?user=${user.id}`;
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setBookings(res.data || []);
        console.log("Bookings API response:", bookings);
      } catch (err) {
        console.error("Error fetching bookings:", err.response?.data || err);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [token, user, navigate]);

  if (loading) return <p className="text-center mt-5">Loading bookings...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  if (bookings.length === 0) return <p className="text-center mt-5">No bookings found.</p>;

  return (
    <div className="container my-5">
      <h2 className="mb-4"> All Bookings</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Event</th>
            <th>Tier</th>
            <th>Seats</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.event}</td>
              <td>{b.ticket_tier}</td>
              <td>{b.select_seats}</td>
              <td>{b.user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBookingsPage;
