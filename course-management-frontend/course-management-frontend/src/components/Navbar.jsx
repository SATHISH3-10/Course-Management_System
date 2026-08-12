import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn }) {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");

        if (setIsLoggedIn) {
            setIsLoggedIn(false);
        }

        window.dispatchEvent(new Event("loginStatusChanged"));

        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">

            <div className="container">

                <Link
                    className="navbar-brand fw-bold"
                    to={isLoggedIn ? "/dashboard" : "/"}
                >
                    🎓 Course Management
                </Link>

                <button
    className="navbar-toggler"
    type="button"
    data-bs-toggle="collapse"
    data-bs-target="#navbarNav"
    aria-controls="navbarNav"
    aria-expanded="false"
    aria-label="Toggle navigation"
>
    <span className="navbar-toggler-icon"></span>
</button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto">

                        {/* HOME */}
                        {location.pathname !== "/" && (
    <li className="nav-item">
        <Link className="nav-link" to="/">
            Home
        </Link>
    </li>
)}

                        {!isLoggedIn ? (

                            /* NOT LOGGED IN */
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>

                        ) : (

                            /* LOGGED IN */
                            <>

                                {/* Show Dashboard only when NOT on Dashboard */}
                                {location.pathname !== "/dashboard" && (
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/dashboard"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                )}

                                {/* Show Courses only when NOT on Courses */}
                                {location.pathname !== "/courses" && (
                                    <li className="nav-item">
                                        <Link
                                            className="nav-link"
                                            to="/courses"
                                        >
                                            Courses
                                        </Link>
                                    </li>
                                )}

                                {/* LOGOUT */}
                                <li className="nav-item ms-2">
                                    <button
                                        className="btn btn-warning"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </li>

                            </>

                        )}

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;