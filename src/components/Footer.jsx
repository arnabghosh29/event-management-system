import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="text-light mt-5" style={{ backgroundColor: "#111" }}>
            <div className="container-fluid py-5 px-4">
                <div className="row gy-4 align-items-start">

                    {/* Logo full, bigger, square */}
                    <div className="col-md-2 d-flex justify-content-start align-items-start">
                        <img
                            src="/image/logo.png"
                            alt="Events Logo"
                            width="180"
                            height="180"
                            style={{
                                objectFit: "contain", // পুরো ছবি দেখাবে
                                marginLeft: "0",
                            }}
                        />
                    </div>

                    {/* Text অংশ */}
                    <div className="col-md-10">
                        <div className="row">

                            {/* About */}
                            <div className="col-md-4">
                                <h4
                                    className="fw-bold mb-3"
                                    style={{ color: "#00bcd4", fontSize: "1.6rem" }}
                                >
                                    Events
                                </h4>
                                <p style={{ color: "#ccc", lineHeight: "1.6" }}>
                                    Discover and book amazing events around you.
                                    We help organizers and attendees connect through seamless experiences.
                                </p>
                            </div>

                            {/* Quick Links */}
                            <div className="col-md-4">
                                <h5 className="fw-semibold mb-3" style={{ color: "#00bcd4" }}>
                                    Quick Links
                                </h5>
                                <ul className="list-unstyled" style={{ color: "#ccc" }}>
                                    <li className="mb-2">
                                        <a href="/" className="text-decoration-none text-light">
                                            Home
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/events" className="text-decoration-none text-light">
                                            Events
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/about" className="text-decoration-none text-light">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/contact" className="text-decoration-none text-light">
                                            Contact
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Socials */}
                            <div className="col-md-4">
                                <h5 className="fw-semibold mb-3" style={{ color: "#00bcd4" }}>
                                    Follow Us
                                </h5>
                                <div className="d-flex gap-3">
                                    <a
                                        href="https://facebook.com"
                                        className="text-light fs-5"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaFacebookF />
                                    </a>
                                    <a
                                        href="https://instagram.com"
                                        className="text-light fs-5"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaInstagram />
                                    </a>
                                    <a
                                        href="https://twitter.com"
                                        className="text-light fs-5"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaTwitter />
                                    </a>
                                    <a
                                        href="https://linkedin.com"
                                        className="text-light fs-5"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FaLinkedin />
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div
                className="text-center py-3"
                style={{
                    backgroundColor: "#0a0a0a",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    fontSize: "0.9rem",
                    color: "#aaa",
                }}
            >
                © {new Date().getFullYear()} Events | All Rights Reserved
            </div>
        </footer>
    );
};

export default Footer;







