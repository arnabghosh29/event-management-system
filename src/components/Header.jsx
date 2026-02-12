import { useState } from "react";

import "./style.css";   // CSS file import

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="header">

            <div className="topheader">
                <div className="logo">
                    <a className="logo" href="index.html">
                        <img alt="logo" loading="lazy" src="./assets/logo.png" />
                    </a>
                </div>
                <form action="" method="post">
                    <div className="searchbar">
                        <i className="fas fa-search search-icon" />
                        <input
                            className="search-input"
                            placeholder="Search for Events..."
                            type="text"
                        />
                    </div>
                </form>
                <div className="btn-section">
                    <form action="" method="post">
                        <select className="location-selector">
                            <option>Event Location </option>
                            <option>New York</option>
                            <option>Los Angeles</option>
                            <option>Chicago</option>
                        </select>
                    </form>
                    <a className="cmn-btn" href="#">
                        {" "}
                        log in
                    </a>
                </div>
            </div>
        </header>
    );
};

export default Header;
