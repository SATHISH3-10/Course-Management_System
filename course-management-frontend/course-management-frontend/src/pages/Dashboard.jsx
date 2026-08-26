import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CourseService } from "../services/CourseService";
function Dashboard() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("loggedIn") === "true"
    );

    const [courseCount, setCourseCount] = useState(0);
const [loadingCourses, setLoadingCourses] = useState(true);

const [backendStatus, setBackendStatus] = useState("Checking...");

    // Protect Dashboard
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);
    useEffect(() => {
    const loadCourseCount = async () => {
        try {
            setLoadingCourses(true);

            const courses = await CourseService.getAllCourses();

            setCourseCount(courses.length);
        } catch (error) {
            console.error("Failed to load course count:", error);
            setCourseCount(0);
        } finally {
            setLoadingCourses(false);
        }
    };
    

    if (isLoggedIn) {
        loadCourseCount();
    }
}, [isLoggedIn]);
useEffect(() => {
    const checkBackendStatus = async () => {
        try {
            const response = await fetch("https://course-management-backend-yrrq.onrender.com/api/courses");

            if (response.ok) {
                setBackendStatus("Active");
            } else {
                setBackendStatus("Offline");
            }
        } catch (error) {
            setBackendStatus("Offline");
        }
    };

    checkBackendStatus();
}, []);

    // Logout
    const handleLogout = () => {
        localStorage.removeItem("loggedIn");

        setIsLoggedIn(false);

        window.dispatchEvent(new Event("loginStatusChanged"));

        navigate("/");
    };

    // Add Course
    const handleAddCourse = () => {
        navigate("/courses");
    };

    // Manage Courses
    const handleManageCourses = () => {
        navigate("/courses");
    };

    return (
        <>
            {/* ================= NAVBAR ================= */}
            <Navbar
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />

            {/* ================= DASHBOARD ================= */}
            <div className="container py-5">

                {/* Welcome Section */}
                <div className="text-center mb-5">

                    <h1 className="display-5 fw-bold">
                        👋 Welcome, Admin
                    </h1>

                    <h3 className="text-primary mt-3">
                        Course Management Dashboard
                    </h3>

                    <p className="lead text-muted mt-3">
                        Manage all course records efficiently from one place.
                    </p>

                </div>
                {/* ================= COURSE STATISTICS ================= */}

<div className="row justify-content-center mb-5">

    <div className="col-md-4">

        <div className="card shadow border-0 text-center">

            <div className="card-body p-4">

                <div className="display-4">
                    📚
                </div>

                <h5 className="text-muted mt-2">
                    Total Courses
                </h5>

                <h1 className="display-4 fw-bold text-primary">
                    {loadingCourses ? "..." : courseCount}
                </h1>

                <p className="text-muted mb-0">
                    Courses stored in database
                </p>

            </div>

        </div>

    </div>

</div>

                {/* ================= QUICK ACTIONS ================= */}

                <div className="card shadow border-0 mb-5">

                    <div className="card-header bg-primary text-white text-center py-3">
                        <h4 className="mb-0">
                            Quick Actions
                        </h4>
                    </div>

                    <div className="card-body">

                        <div className="row justify-content-center g-4">

                            {/* Manage Courses */}
                            <div className="col-md-5">

                                <div className="card h-100 shadow-sm text-center border-0">

                                    <div className="card-body p-4">

                                        <div className="display-4 mb-3">
                                            📚
                                        </div>

                                        <h4>
                                            Manage Courses
                                        </h4>

                                        <p className="text-muted">
                                            Add, view, update and delete
                                            course records.
                                        </p>

                                        <button
                                            className="btn btn-primary px-4"
                                            onClick={handleManageCourses}
                                        >
                                            📚 Manage Courses
                                        </button>

                                    </div>

                                </div>

                            </div>


                            {/* Add Course */}
                            <div className="col-md-5">

                                <div className="card h-100 shadow-sm text-center border-0">

                                    <div className="card-body p-4">

                                        <div className="display-4 mb-3">
                                            ➕
                                        </div>

                                        <h4>
                                            Add Course
                                        </h4>

                                        <p className="text-muted">
                                            Create and add a new course
                                            to the system.
                                        </p>

                                        <button
                                            className="btn btn-success px-4"
                                            onClick={handleAddCourse}
                                        >
                                            ➕ Add Course
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= RECENT INFORMATION ================= */}

                <div className="card shadow border-0 mb-5">

                    <div className="card-header bg-dark text-white text-center py-3">
                        <h4 className="mb-0">
                            Recent Information
                        </h4>
                    </div>

                    <div className="card-body">

                        <div className="row g-3">

                            {/* Backend */}
                            <div className="col-md-6">
                                <div className="alert alert-success mb-0">
                                    ✔ <strong>Backend:</strong> Running on
                                    Spring Boot
                                </div>
                            </div>


                            {/* Database */}
                            <div className="col-md-6">
                                <div className="alert alert-success mb-0">
                                    ✔ <strong>Database:</strong> MySQL
                                    Connected
                                </div>
                            </div>


                            {/* REST API */}
                            <div className="col-md-6">
                                <div className="alert alert-success mb-0">
                                    ✔ <strong>REST API:</strong> Working
                                </div>
                            </div>


                            {/* CRUD */}
                            <div className="col-md-6">
                                <div className="alert alert-success mb-0">
                                    ✔ <strong>CRUD Operations:</strong> Enabled
                                </div>
                            </div>


                            {/* Login */}
                            <div
    className={`alert ${
        backendStatus === "Active"
            ? "alert-success"
            : backendStatus === "Offline"
            ? "alert-danger"
            : "alert-warning"
    } mb-0 text-center`}
>
    {backendStatus === "Active" ? "✔" : "⚠"}{" "}
    <strong>Backend Status:</strong> {backendStatus}
</div>

                        </div>

                    </div>

                </div>


                {/* ================= TECHNOLOGY STACK ================= */}

                <div className="card shadow border-0 mb-5">

                    <div className="card-header bg-primary text-white text-center py-3">
                        <h4 className="mb-0">
                            Technology Stack
                        </h4>
                    </div>

                    <div className="card-body text-center py-4">

                        <span className="badge bg-primary fs-6 m-2 p-3">
                            React.js
                        </span>

                        <span className="badge bg-success fs-6 m-2 p-3">
                            Spring Boot
                        </span>

                        <span className="badge bg-dark fs-6 m-2 p-3">
                            MySQL
                        </span>

                        <span className="badge bg-warning text-dark fs-6 m-2 p-3">
                            REST API
                        </span>

                        <span className="badge bg-secondary fs-6 m-2 p-3">
                            Bootstrap
                        </span>

                    </div>

                </div>

            </div>


            {/* ================= FOOTER ================= */}

            <Footer />
        </>
    );
}

export default Dashboard;