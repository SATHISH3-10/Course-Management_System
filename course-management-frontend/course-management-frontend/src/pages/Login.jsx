import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === "admin" && password === "admin123") {

            localStorage.setItem("loggedIn", "true");
            window.dispatchEvent(new Event("loginStatusChanged"));
            navigate("/dashboard");

        } else {
            alert("Invalid Username or Password");
        }
    };

    return (

        <div className="container mt-5" style={{ maxWidth: "400px" }}>

            <h2 className="text-center mb-4">
                Admin Login
            </h2>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="btn btn-success w-100"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;