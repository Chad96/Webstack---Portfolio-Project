import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import cryptoJS from "crypto-js";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the user from the JSON server based on the entered email
      const response = await axios.get(
        `http://localhost:3000/users?email=${email}`
      );
      const user = response.data[0];

      if (user) {
        // Hash the entered password using SHA-256
        const hashedPassword = cryptoJS.SHA256(password).toString();

        // Check if the hashed passwords match
        if (hashedPassword === user.password) {
          alert("Login successful!");
          navigate("/home"); // Redirect to the Home page displaying saved recipes
        } else {
          alert("Incorrect password! Please try again.");
        }
      } else {
        alert("User not found! Please register first.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed! Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/src/assets/your-background-image.jpg')`, // Replace with your background image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0",
        margin: "0",
        position: "relative",
      }}
    >
      <header
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)", // semi-transparent background
          zIndex: "1000",
        }}
      >
        <h3 style={{ margin: "0", paddingLeft: "20px" }}>Recipe Master</h3>
        <nav
          style={{
            padding: "0 20px",
          }}
        >
          <Link
            to="/"
            style={{
              marginRight: "20px",
              textDecoration: "none",
              color: "white",
            }}
          >
            Home
          </Link>
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            Register
          </Link>
        </nav>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
          paddingTop: "80px", // Add padding to avoid overlap with header
        }}
      >
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.01)", // Slightly opaque to see background
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <h2 className="text-center mb-4">Log In</h2>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                backgroundColor: "#007bff",
                color: "#fff",
                fontSize: "16px",
              }}
            >
              Log In
            </button>
          </form>
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#007bff" }}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
