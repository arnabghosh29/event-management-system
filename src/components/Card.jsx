import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    fetchAllEvents,
    fetchPopularEvents,
    fetchCategories,
} from "../api/api";
import "./Card.css";

const Card = () => {
    const [popularEvents, setPopularEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [popular, cats, all] = await Promise.all([
                fetchPopularEvents(),
                fetchCategories(),
                fetchAllEvents(),
            ]);
            setPopularEvents(popular);
            setCategories(cats);
            setAllEvents(all);
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading)
        return (
            <div className="text-center mt-5 text-light">
                <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );

    return (
        <div className="container my-5 text-light">

            {/* Popular Events */}
            <h3 className="section-title">Popular Events</h3>
            <div className="scroll-row">
                {popularEvents.map((event) => (
                    <div
                        key={event.id}
                        className="event-card"
                        onClick={() => navigate(`/event/${event.id}`)}
                    >
                        <img
                            src={event.portrait || event.wallpaper}
                            alt={event.title}
                            className="event-img"
                        />
                        <div className="event-overlay">
                            <h6 className="event-title">{event.title}</h6>
                        </div>
                    </div>
                ))}
            </div>

            {/*Categories */}
            <h3 className="section-title mt-5">Categories</h3>
            <div className="scroll-row">
                {categories.map((cat) => (
                    <div key={cat.id} className="category-card">
                        <div className="category-image">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="category-img"
                            />
                        </div>
                        <div className="category-name">{cat.name}</div>
                    </div>
                ))}
            </div>

            {/* All Events */}
            <h3 className="section-title mt-5">All Events</h3>
            <div className="row g-4">
                {allEvents.map((event) => (
                    <div key={event.id} className="col-md-4 col-sm-6">
                        <div className="event-box" onClick={() => navigate(`/event/${event.id}`)}>
                            <img
                                src={event.wallpaper || event.portrait}
                                alt={event.title}
                                className="event-box-img"
                            />
                            <div className="event-box-body">
                                <h5 className="event-box-title">{event.title}</h5>
                                <button className="btn btn-info w-100 mt-3">View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Card;
