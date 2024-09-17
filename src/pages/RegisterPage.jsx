import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import cryptoJS from "crypto-js";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hash password using SHA-256
    const hashedPassword = cryptoJS.SHA256(password).toString();

    // Convert profile picture to base64, hash it with SHA-256, and then register user
    if (profilePicture) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const hashedProfilePicture = hashImage(reader.result);
        await registerUser(hashedProfilePicture, hashedPassword);
      };
      reader.readAsDataURL(profilePicture);
    } else {
      await registerUser("", hashedPassword);
    }
  };

  const hashImage = (imageBase64) => {
    return cryptoJS.SHA256(imageBase64).toString(cryptoJS.enc.Hex);
  };

  const registerUser = async (profilePictureHash, hashedPassword) => {
    const user = {
      username,
      email,
      password: hashedPassword,
      profilePicture: profilePictureHash,
    };

    try {
      await axios.post("http://localhost:3000/users", user);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed! Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
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
            to="/login"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            Log in
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
            encType="multipart/form-data"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.01)", // Slightly opaque to see background
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
            }}
          >
            <h2 className="text-center mb-4">Register</h2>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                type="file"
                id="profilePicture"
                onChange={(e) => setProfilePicture(e.target.files[0])}
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
              Register
            </button>
          </form>
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#007bff" }}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
