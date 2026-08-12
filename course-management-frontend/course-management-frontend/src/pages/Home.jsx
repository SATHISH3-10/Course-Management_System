import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("loggedIn") === "true"
    );

    // Update UI whenever login/logout changes
    useEffect(() => {
        const updateLoginStatus = () => {
            setIsLoggedIn(localStorage.getItem("loggedIn") === "true");
        };

        window.addEventListener("storage", updateLoginStatus);

        window.addEventListener("loginStatusChanged", updateLoginStatus);

        return () => {
            window.removeEventListener("storage", updateLoginStatus);
            window.removeEventListener("loginStatusChanged", updateLoginStatus);
        };
    }, []);

    const handleGetStarted = () => {
        if (isLoggedIn) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (
        <>
            <Navbar
    isLoggedIn={isLoggedIn}
    setIsLoggedIn={setIsLoggedIn}
/>

            {/* Hero Section */}
            <section
                className="text-white text-center py-5"
                style={{
                    background:
                        "linear-gradient(135deg,#2563eb,#7c3aed)"
                }}
            >
                <div className="container">

                    <h1 className="display-3 fw-bold">
                        🎓 Course Management System
                    </h1>

                    <p className="lead mt-4">
                        A Full Stack Web Application developed using
                        <strong> React.js, Spring Boot and MySQL.</strong>
                    </p>

                    {isLoggedIn && (
                        <div className="alert alert-success mt-4 d-inline-block">
                            👋 Welcome back, <strong>Admin</strong>!
                        </div>
                    )}

                    <div>
                        <button
                            className="btn btn-warning btn-lg mt-4 px-5"
                            onClick={handleGetStarted}
                        >
                            {isLoggedIn
                                ? "Go to Dashboard →"
                                : "Get Started →"}
                        </button>
                    </div>

                </div>
            </section>

            {/* Features */}

            <div className="container my-5">

                <h2 className="text-center mb-5 fw-bold">
                    Project Features
                </h2>

                <div className="row">

                    <div className="col-md-3 mb-4">
                        <div className="card h-100 text-center p-4 shadow">
                            <h1>📚</h1>
                            <h4>Course Management</h4>
                            <p>
                                Easily manage all available courses.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <div className="card h-100 text-center p-4 shadow">
                            <h1>➕</h1>
                            <h4>Add Courses</h4>
                            <p>
                                Create new course records instantly.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <div className="card h-100 text-center p-4 shadow">
                            <h1>✏️</h1>
                            <h4>Update Courses</h4>
                            <p>
                                Modify course details anytime.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <div className="card h-100 text-center p-4 shadow">
                            <h1>🗑️</h1>
                            <h4>Delete Courses</h4>
                            <p>
                                Remove outdated course information.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

            {/* About */}

            <div className="container mb-5">

                <div className="card shadow-lg border-0 p-5">

                    <h2 className="text-primary mb-4">
                        About This Project
                    </h2>

                    <p>
                        The Course Management System is a full-stack web
                        application that enables administrators to perform
                        complete CRUD (Create, Read, Update and Delete)
                        operations on course information.
                    </p>

                    <p>
                        The frontend is developed using React.js,
                        the backend uses Spring Boot REST APIs,
                        and MySQL stores all course records permanently.
                    </p>

                    <hr />

                    <h4 className="text-success">
                        Technologies Used
                    </h4>

                    <div className="row mt-4">

                        <div className="col-md-3">
                            ✅ React.js
                        </div>

                        <div className="col-md-3">
                            ✅ Spring Boot
                        </div>

                        <div className="col-md-3">
                            ✅ MySQL
                        </div>

                        <div className="col-md-3">
                            ✅ REST API
                        </div>

                    </div>

                </div>

            </div>

            <Footer />
        </>
    );
}

export default Home;