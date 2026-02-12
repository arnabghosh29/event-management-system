import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import "./style.css";

const Navbar = () => {
    const { user, token, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");

    const handleProfileClick = () => {
        if (!token) {
            navigate("/register");
        } else {
            navigate("/profile");
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "black" }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="/image/logo.png" width="90px" alt="Logo" />
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/events">Events</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/bookings">Tickets</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-link text-white p-0 me-3"
                            style={{ textDecoration: "none" }}
                            onClick={handleProfileClick}
                            title={token ? user?.username : "Register / Login"}
                        >
                            <FaUserCircle size={30} />
                        </button>

                        {/* Show search bar only if logged in */}
                        {token && (
                            <form className="d-flex me-3" onSubmit={handleSearch}>
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search Tickets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    aria-label="Search"
                                />
                                <button className="btn btn-outline-success" type="submit">
                                    Search
                                </button>
                            </form>
                        )}

                        {token && (
                            <button className="btn btn-outline-danger" onClick={() => logout()}>
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
