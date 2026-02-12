import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProfilePage.css";

const ProfilePage = () => {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) {
            alert("⚠️ Please login first!");
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await axios.get(
                    "https://events.deepanwita.fun/account/user/",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("User Data:", res.data);
                setUserDetails(res.data);
            } catch (err) {
                console.error(" Fetch user failed:", err.response?.data || err);
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [token, navigate]);

    if (loading)
        return (
            <div className="profile-loader">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="profile-error">
                <h5>{error}</h5>
            </div>
        );

    if (!userDetails) return null;

    const user = userDetails.user;

    return (
        <div className="profile-wrapper">
            <div className="profile-card">
                <div className="profile-badge">{user.username.charAt(0).toUpperCase()}</div>
                <h3 className="profile-username">{user.username}</h3>
                <span className="profile-email">{user.email}</span>

                <hr />

                <div className="profile-details">
                    <p>
                        <strong>First Name:</strong> <span>{user.first_name || "—"}</span>
                    </p>
                    <p>
                        <strong>Last Name:</strong> <span>{user.last_name || "—"}</span>
                    </p>
                    <p>
                        <strong>Role:</strong> <span className="badge bg-info text-dark">{userDetails.role}</span>
                    </p>
                    <p>
                        <strong>Organizer:</strong>{" "}
                        {userDetails.is_organizer ? (
                            <span className="text-success fw-semibold">Yes</span>
                        ) : (
                            <span className="text-danger fw-semibold">No</span>
                        )}
                    </p>
                    <p>
                        <strong>User:</strong>{" "}
                        {userDetails.is_user ? (
                            <span className="text-success fw-semibold">Yes</span>
                        ) : (
                            <span className="text-danger fw-semibold">No</span>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;




